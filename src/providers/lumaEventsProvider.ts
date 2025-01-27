// googleCalendarProvider.ts
import { google, calendar_v3 } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

interface ServiceAccountCredentials {
    type: 'service_account';
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
}

interface CalendarEvent {
    title: string;
    date: string;
    location: string;
    description: string;
    url: string;
}

class GoogleCalendarService {
    private calendarId: string;
    private auth: GoogleAuth;
    private calendar: calendar_v3.Calendar | null;

    constructor(credentials: ServiceAccountCredentials) {
        this.calendarId = 'ulfan0ad3hr5e3r3qm0mgvmp2idmorq4@import.calendar.google.com';
        this.auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
        });
        this.calendar = null;
    }

    async initialize(): Promise<void> {
        const authClient = await this.auth.getClient();
        this.calendar = google.calendar({
            version: 'v3',
            auth: authClient as any // Type assertion to avoid auth type issues
        });
    }

    async fetchEvents(): Promise<CalendarEvent[]> {
        try {
            if (!this.calendar) {
                throw new Error('Calendar service not initialized');
            }

            const now = new Date().toISOString();
            const oneYearLater = new Date();
            oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

            const response = await this.calendar.events.list({
                calendarId: this.calendarId,
                timeMin: now,
                timeMax: oneYearLater.toISOString(),
                singleEvents: true,
                orderBy: 'startTime'
            });

            return (response.data.items || []).map(event => ({
                title: event.summary || 'No Title',
                date: event.start?.dateTime || event.start?.date || '',
                location: event.location || 'No Location',
                description: event.description || 'No Description',
                url: this.extractUrl(event.description || '')
            }));
        } catch (error) {
            console.error('Error fetching calendar events:', error);
            return [];
        }
    }

    private extractUrl(description: string): string {
        const urlMatch = description.match(/(https:\/\/lu\.ma\/\S+)/);
        return urlMatch ? urlMatch[1] : '';
    }

    formatEventsAsString(events: CalendarEvent[]): string {
        let output = `Calendar Events\n`;
        output += `Total Events: ${events.length}\n\n`;

        events.forEach(event => {
            output += `Event: ${event.title}\n`;
            output += `Time: ${event.date}\n`;
            output += `Location: ${event.location}\n`;
            if (event.url) output += `URL: ${event.url}\n`;
            output += `Description: ${event.description}\n`;
            output += `\n`;
        });
        return output;
    }
}

interface Provider {
    get: () => Promise<string>;
}

// Export the provider following the Provider pattern
export const lumaEventsProvider: Provider = {
    get: async () => {
        const credentials: ServiceAccountCredentials = {
            type: 'service_account',
            project_id: process.env.GOOGLE_PROJECT_ID!,
            private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID!,
            private_key: process.env.GOOGLE_PRIVATE_KEY!,
            client_email: process.env.GOOGLE_CLIENT_EMAIL!,
            client_id: process.env.GOOGLE_CLIENT_ID!,
            auth_uri: 'https://accounts.google.com/o/oauth2/auth',
            token_uri: 'https://oauth2.googleapis.com/token',
            auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
            client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL!
        };

        const calendarService = new GoogleCalendarService(credentials);
        await calendarService.initialize();
        const events = await calendarService.fetchEvents();
        return calendarService.formatEventsAsString(events);
    }
};