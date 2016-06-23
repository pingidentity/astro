var Genres = {
    ACTION: {
        id: "ACTION",
        title: "Action",
        description: "Action description"
    },
    ADVENTURE: {
        id: "ADVENTURE",
        title: "Adventure",
        description: "Adventure description"
    },
    ANIMATION: {
        id: "ANIMATION",
        title: "Animation",
        description: "Animation description"
    },
    BIOGRAPHY: {
        id: "BIOGRAPHY",
        title: "Biography",
        description: "Biography description"
    },
    COMEDY: {
        id: "COMEDY",
        title: "Comedy",
        description: "Comedy description"
    },
    CRIME: {
        id: "CRIME",
        title: "Crime",
        description: "Crime description"
    },
    DRAMA: {
        id: "DRAMA",
        title: "Drama",
        description: "Drama description"
    },
    FANTASY: {
        id: "FANTASY",
        title: "Fantasy",
        description: "Fantasy description"
    },
    HISTORY: {
        id: "HISTORY",
        title: "History",
        description: "History description"
    },
    HORROR: {
        id: "HORROR",
        title: "Horror",
        description: "Horror description"
    },
    MUSIC: {
        id: "MUSIC",
        title: "Music",
        description: "Music description"
    },
    MYSTERY: {
        id: "MYSTERY",
        title: "Mystery",
        description: "Mystery description"
    },
    POLITICAL: {
        id: "POLITICAL",
        title: "Political",
        description: "Political description"
    },
    ROMANCE: {
        id: "ROMANCE",
        title: "Romance",
        description: "Romance description"
    },
    SCI_FI: {
        id: "SCI_FI",
        title: "Sci-Fi",
        description: "Sci-Fi description"
    },
    SLICE_OF_LIFE: {
        id: "SLICE_OF_LIFE",
        title: "Slice of Life",
        description: "Slice of Life description"
    },
    THRILLER: {
        id: "THRILLER",
        title: "Thriller",
        description: "Thriller description"
    },
    WESTERN: {
        id: "WESTERN",
        title: "Western",
        description: "Western description"
    }
};

var StatusEnum = {
    COMPLETE: "Complete",
    ONGOING: "Ongoing"
};

var Shows = [
    {
        id: "1",
        title: "Game of Thrones",
        genres: [Genres.ADVENTURE, Genres.DRAMA, Genres.FANTASY],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "2",
        title: "The Walking Dead",
        genres: [Genres.DRAMA, Genres.HORROR, Genres.SCI_FI],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "3",
        title: "Hawaii Five-0",
        genres: [Genres.ACTION, Genres.CRIME, Genres.DRAMA],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "4",
        title: "House of Cards",
        genres: [Genres.DRAMA, Genres.POLITICAL],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "5",
        title: "Pretty Little Liars",
        genres: [Genres.DRAMA, Genres.MYSTERY, Genres.ROMANCE],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "6",
        title: "Person of Interest",
        genres: [Genres.ACTION, Genres.DRAMA, Genres.MYSTERY],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "7",
        title: "Lilo and Stitch",
        genres: [Genres.ANIMATION, Genres.ADVENTURE, Genres.COMEDY],
        status: StatusEnum.COMPLETE,
        summary: "summary"
    },
    {
        id: "8",
        title: "Suits",
        genres: [Genres.COMEDY, Genres.DRAMA],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "9",
        title: "Avatar: The Last Airbender",
        genres: [Genres.ANIMATION, Genres.ACTION, Genres.ADVENTURE],
        status: StatusEnum.COMPLETE,
        summary: "summary"
    },
    {
        id: "10",
        title: "Tut",
        genres: [Genres.BIOGRAPHY, Genres.DRAMA, Genres.HISTORY],
        status: StatusEnum.COMPLETE,
        summary: "summary"
    },
    {
        id: "11",
        title: "Glee",
        genres: [Genres.COMEDY, Genres.DRAMA, Genres.MUSIC],
        status: StatusEnum.COMPLETE,
        summary: "summary"
    },
    {
        id: "12",
        title: "Crossbones",
        genres: [Genres.ADVENTURE, Genres.DRAMA],
        status: StatusEnum.COMPLETE,
        summary: "summary"
    },
    {
        id: "13",
        title: "Veronica Mars",
        genres: [Genres.CRIME, Genres.DRAMA, Genres.MYSTERY],
        status: StatusEnum.COMPLETE,
        summary: "summary"
    },
    {
        id: "14",
        title: "Prison Break",
        genres: [Genres.ACTION, Genres.CRIME, Genres.DRAMA],
        status: StatusEnum.COMPLETE,
        summary: "summary"
    },
    {
        id: "15",
        title: "Heroes",
        genres: [Genres.DRAMA, Genres.FANTASY, Genres.SCI_FI],
        status: StatusEnum.COMPLETE,
        summary: "summary"
    },
    {
        id: "16",
        title: "Rookie Blue",
        genres: [Genres.CRIME, Genres.DRAMA],
        status: StatusEnum.COMPLETE,
        summary: "summary"
    },
    {
        id: "17",
        title: "The 100",
        genres: [Genres.DRAMA, Genres.MYSTERY, Genres.SCI_FI],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "18",
        title: "Grey's Anatomy",
        genres: [Genres.DRAMA, Genres.ROMANCE],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "19",
        title: "Lucifer",
        genres: [Genres.CRIME, Genres.DRAMA, Genres.FANTASY],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "20",
        title: "Mr. Robot",
        genres: [Genres.CRIME, Genres.DRAMA, Genres.THRILLER],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "21",
        title: "Vikings",
        genres: [Genres.ACTION, Genres.DRAMA, Genres.HISTORY],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "22",
        title: "Orange Is the New Black",
        genres: [Genres.COMEDY, Genres.CRIME, Genres.DRAMA],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "23",
        title: "Wentworth",
        genres: [Genres.CRIME, Genres.DRAMA],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "24",
        title: "Sense8",
        genres: [Genres.DRAMA, Genres.MYSTERY, Genres.SCI_FI],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "25",
        title: "Marco Polo",
        genres: [Genres.ADVENTURE, Genres.DRAMA, Genres.HISTORY],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "26",
        title: "Scandal",
        genres: [Genres.DRAMA, Genres.THRILLER],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "27",
        title: "Orphan Black",
        genres: [Genres.ACTION, Genres.DRAMA, Genres.SCI_FI],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "28",
        title: "The Originals",
        genres: [Genres.DRAMA, Genres.FANTASY, Genres.HORROR],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "29",
        title: "Chicago P.D.",
        genres: [Genres.ACTION, Genres.CRIME, Genres.DRAMA],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "30",
        title: "Black Sails",
        genres: [Genres.ADVENTURE, Genres.DRAMA],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "31",
        title: "Ray Donovan",
        genres: [Genres.CRIME, Genres.DRAMA],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "32",
        title: "Reign",
        genres: [Genres.DRAMA, Genres.FANTASY],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "33",
        title: "The Following",
        genres: [Genres.CRIME, Genres.DRAMA, Genres.MYSTERY],
        status: StatusEnum.COMPLETE,
        summary: "summary"
    },
    {
        id: "34",
        title: "Lost",
        genres: [Genres.ADVENTURE, Genres.DRAMA, Genres.FANTASY],
        status: StatusEnum.COMPLETE,
        summary: "summary"
    },
    {
        id: "35",
        title: "The Good Wife",
        genres: [Genres.CRIME, Genres.DRAMA, Genres.MYSTERY],
        status: StatusEnum.COMPLETE,
        summary: "summary"
    },
    {
        id: "36",
        title: "Arrow",
        genres: [Genres.ACTION, Genres.ADVENTURE, Genres.CRIME],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "37",
        title: "Nikita",
        genres: [Genres.ACTION, Genres.CRIME, Genres.DRAMA],
        status: StatusEnum.COMPLETE,
        summary: "summary"
    },
    {
        id: "38",
        title: "The Last Ship",
        genres: [Genres.ACTION, Genres.DRAMA, Genres.SCI_FI],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "39",
        title: "Sherlock",
        genres: [Genres.CRIME, Genres.DRAMA, Genres.MYSTERY],
        status: StatusEnum.ONGOING,
        summary: "summary"
    },
    {
        id: "40",
        title: "How to Get Away with Murder",
        genres: [Genres.CRIME, Genres.DRAMA, Genres.MYSTERY],
        status: StatusEnum.ONGOING,
        summary: "summary"
    }
];

module.exports.Genres = Genres;
module.exports.StatusEnum = StatusEnum;
module.exports.Shows = Shows;