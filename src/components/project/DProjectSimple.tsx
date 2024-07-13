import { CSSProperties } from "react";
import { DProjectProps } from "./EProject";

export type DProjectSimpleStyles = {
    container: CSSProperties;
    text: CSSProperties;
}

export type DProjectSimpleProps = {
    type?: "simple";
    styles?: DProjectSimpleStyles;
}

const defaultDProjectSimpleStyles: DProjectSimpleStyles = {
    container: {

    },
    text: {

    }
}

export function DProjectSimple(
    {
        project,
        styles = defaultDProjectSimpleStyles
    }: DProjectProps<DProjectSimpleProps>
) {
    return <div
        style={styles.container}
    >
        <p style={styles.text}>Name: {project.name}</p>
        <p style={styles.text}>Description: {project.description}</p>
        <p style={styles.text}>Status: {project.status}</p>
        <p style={styles.text}>URL: {project.url}</p>
    </div>
}
