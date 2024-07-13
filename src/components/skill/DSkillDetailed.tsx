import { CSSProperties } from "react";
import { DSkillProps } from "./ESkill";

export type DSkillDetailedStyles = {
    container: CSSProperties;
    text: CSSProperties;
    list: CSSProperties;
}

export type DSkillDetailedProps = {
    type?: "detailed";
    styles?: DSkillDetailedStyles;
}

const defaultDSkillDetailedStyles: DSkillDetailedStyles = {
    container: {
        border: "1px solid black"
    },
    text: {

    },
    list: {

    }
}

export function DSkillDetailed(
    {
        skill,
        styles = defaultDSkillDetailedStyles
    }: DSkillProps<DSkillDetailedProps>
) {
    return <div
        style={styles.container}
    >
        <p style={styles.text}>Name: {skill.name}</p>
        <p style={styles.text}>Description: {skill.description}</p>
        <ul
            style={styles.list}
        >
            <p style={styles.text}>Projects</p>
            {
                skill.projects.map((project) => <li style={styles.text}>{project}</li>)
            }
        </ul>
    </div>
}
