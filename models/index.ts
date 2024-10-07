interface ICharacterWand {
    core: string
    length: string | null
    wood: string
}

export interface ICharacterItem {
    id: string
    actor: string;
    alive: boolean;
    alternate_actors: Array<string>;
    alternate_names: Array<string>;
    ancestry: string;
    dateOfBirth: string | null;
    eyeColour: string
    gender: string
    hairColour: string
    hogwartsStaff: boolean
    hogwartsStudent: boolean
    house: string
    image: string
    name: string
    patronus: string
    species: string
    wand: ICharacterWand
    wizard: boolean
    yearOfBirth: string | null
    attempts?: number
    isHasSuccessAttempt?: boolean
  }