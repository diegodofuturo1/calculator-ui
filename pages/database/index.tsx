import { NextPage } from "next";
import EntityTable from "../../components/table";

interface DataBasePageProps {
    path: 'Conhecimento > Banco de Dados'
}

const DataBasePage: NextPage = () => {
    return <EntityTable />
}

export default DataBasePage