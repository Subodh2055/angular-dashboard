export class GeoModel {
    lat: string = '';
    lng: string = '';

    constructor(data?: Partial<GeoModel>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    getCoordinates(): { lat: number; lng: number } {
        return {
            lat: parseFloat(this.lat) || 0,
            lng: parseFloat(this.lng) || 0
        };
    }
}
