export class Booking {
    constructor(
        public id: string,
        public placeId: string,
        public userId: string,
        public guestNo: number,
        public placeTitle: string
    ) { }
}
