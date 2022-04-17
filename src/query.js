import { gql } from '@apollo/client';

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
        id
      }
    }
  }
`;

const GET_POKEMON = gql`
    query pokemon($name: String!) {
        pokemon(name: $name) {
            id
            height
            weight
            species {
                name
                url
            }
            name
            # image
            sprites {
                front_default
                }
            moves {
                move {
                    name
                }
            }
            types {
                type {
                    name
                    # slot
                }
                slot
            }
            status
            message
            forms{
                name
                id
            }
            game_indices {
              game_index
              version {
                  name
              }
            }
            abilities {
              is_hidden
              slot
              ability{
                name
                url
                id
              }
            }
        }
    }
`

export { GET_POKEMONS, GET_POKEMON };