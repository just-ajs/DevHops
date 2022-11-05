import { Kanban } from "../components"

const AppRoot = (): React.ReactElement => {

    return <div className="w-vw h-vh">
        <Kanban tasks={[]} />
    </div>
}

export default AppRoot