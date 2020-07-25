export const personRootResolver = {
  getPerson: (_, args, {db}) => ([
    ...db.women,
    ...db.men
  ])
}

export const Person = {
  __resolveType(person, ctx, info){
    if(person.favoriteClothes){
      return info.schema.getType('Woman');
    }

    if(person.favoriteCars){
      return info.schema.getType('Man');
    }

    return null;
  },
}
