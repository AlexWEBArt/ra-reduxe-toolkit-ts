import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks"
import { DataTable, DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Films } from "../../../../redux/slices/filmsSlice";
import { useState, useEffect } from "react";
import { addFilm } from "../../../../redux/slices/filmsSlice"
import { Link } from "react-router-dom";

export default function FilmsList() {
    const { items, favorite } = useAppSelector(state => state.films);
    const [selectedFilms, setSelectedFilms] = useState<Films[] | null>(favorite);
    const dispatch = useAppDispatch();

    useEffect(() => {
        selectedFilms?.forEach((item, index) => {
            if(favorite[index] && favorite[index].imdbID === item.imdbID) {
                return null
            }
            dispatch(addFilm(item))
        })
    }, [selectedFilms])

    const imageBodyTemplate = (item: Films) => {
        return <Link to={`/film-card/${item.imdbID}`}><img src={item.Poster} alt={item.Title} width="64px" className="shadow-4"/></Link>;
    };

    const onSelectionChange = (event: DataTableSelectionChangeEvent<Films[]>) => {
        const value = event.value as Films[];
        setSelectedFilms(value);
    };

    return (
        <div className="card">
            <DataTable value={items} size={"small"} sortField="price" sortOrder={-1} tableStyle={{ minWidth: '40rem' }} onSelectionChange={onSelectionChange} selection={selectedFilms!}>
                <Column header="Постер" body={imageBodyTemplate} style={{ width: '20%' }}/>
                <Column field="Title" header="Название" sortable style={{ width: '55%' }}></Column>
                <Column field="Type" header="Тип" sortable style={{ width: '10%' }}></Column>
                <Column field="Year" header="Год" sortable style={{ width: '10%' }}></Column>
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
            </DataTable>
        </div>
    );
}