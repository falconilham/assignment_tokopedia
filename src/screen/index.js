import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPokemon from './list-pokemon';
import MyListPokemon from './my-pokemon-list';
import PokemonDetail from './pokemon-detail';

function AppRoute({ children }) {
    return (
        <BrowserRouter>
            {children}
            <Routes>
                <Route path="/" element={<ListPokemon />} />
                <Route path="/my-pokemon" element={<MyListPokemon />} />
                <Route path="/pokemon-detail/:name" element={<PokemonDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoute