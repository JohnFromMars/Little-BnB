export class Place {
    constructor
        // tslint:disable-next-line: space-before-function-paren
        (
            public id: string,
            public title: string,
            public description: string,
            public imgUrl: string,
            public price: number,
            public availableFrom: Date,
            public availableTo: Date,
            public userId: string
        ) { }
}
