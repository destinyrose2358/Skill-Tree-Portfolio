import { useContext, useMemo } from "react";
import { SkillTreeContext } from "../../contexts/SkillTreeContext";
import { Skill } from "../../models/skill";
import { DSkillDetailed, DSkillDetailedProps } from "./DSkillDetailed";
import { DSkillSimple, DSkillSimpleProps } from "./DSkillSimple";

export type ESkillPropsBase = {
    skillName: string;
}

export type ESkillProps<
    EP extends { [p: string]: any; }
> = ESkillPropsBase & (
    DSkillDetailedProps |
    DSkillSimpleProps |
    DSkillCustomProps<EP>
);

export type DSkillBaseProps = {
    skill: Skill;
}

export type DSkillCustomProps<P extends { [p: string]: any } = any> = {
    type?: "custom";
    component: (props: DSkillProps<P>) => JSX.Element;
} & Omit<P, "type">;

export type DSkillProps<DSP> = DSkillBaseProps & Omit<DSP, "type">;

export function ESkill<EP extends { [p: string]: any; }>(
    {
        skillName,
        type = "simple",
        ...typedProps
    }: ESkillProps<EP>
) {
    const {
        skills
    } = useContext(SkillTreeContext);
    const skill = skills[skillName];
    const renderedSkill = useMemo(() => {
        switch (type) {
            case "simple":
                return <DSkillSimple skill={skill} />
            case "detailed":
                return <DSkillDetailed skill={skill} />
            case "custom":
                const {
                    component: CustomComponent,
                    ...other
                } = typedProps as Omit<DSkillCustomProps<EP>, "type">;
                return <CustomComponent
                    skill={skill}
                    {
                        ...other
                    }
                />
        }
    }, [
        skill,
        type,
        typedProps
    ]);

    return renderedSkill;
}
