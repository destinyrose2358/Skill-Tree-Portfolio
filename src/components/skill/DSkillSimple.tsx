import { CSSProperties } from "react";
import { DSkillProps } from "./ESkill";

export type DSkillSimpleStyles = {
    container: CSSProperties;
    text: CSSProperties;
}

export type DSkillSimpleProps = {
    type?: "simple";
    styles?: DSkillSimpleStyles;
}

const defaultDSkillSimpleStyles: DSkillSimpleStyles = {
    container: {
        border: "1px solid black"
    },
    text: {

    }
}

export function DSkillSimple(
    {
        skill,
        styles = defaultDSkillSimpleStyles
    }: DSkillProps<DSkillSimpleProps>
) {
    return <div
        style={styles.container}
    >
        <p style={styles.text}>Name: {skill.name}</p>
        <p style={styles.text}>Description: {skill.description}</p>
    </div>
}
