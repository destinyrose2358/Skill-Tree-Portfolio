import { CSSProperties } from "react";
import { DProjectProps } from "./EProject";

export type DProjectDetailedStyles = {
    container: CSSProperties;
}

export type DProjectDetailedProps = {
    type?: "detailed";
    styles?: DProjectDetailedStyles;
}

const defaultDProjectDetailedStyles: DProjectDetailedStyles = {
    container: {

    }
}

export function DProjectDetailed(
    {
        project,
        styles = defaultDProjectDetailedStyles
    }: DProjectProps<DProjectDetailedProps>
) {
    return <div>
        <p>Name: {project.name}</p>
        <p>Description: {project.description}</p>
        <p>Status: {project.status}</p>
        <p>URL: {project.url}</p>
        <ul>
            <p>Skills</p>
            {
                project.skills.map((skill) => <li>{skill}</li>)
            }
        </ul>
        <ul>
            <p>Dependencies</p>
            {
                project.dependencies.map((project) => <li>{project}</li>)
            }
        </ul>
        <ul>
            <p>Dependents</p>
            {
                project.dependents.map((project) => <li>{project}</li>)
            }
        </ul>
    </div>
}
