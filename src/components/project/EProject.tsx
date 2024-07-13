import { useContext, useMemo } from "react";
import { SkillTreeContext } from "../../contexts/SkillTreeContext";
import { Project } from "../../models/project";
import { DProjectDetailed, DProjectDetailedProps } from "./DProjectDetailed";
import { DProjectSimple, DProjectSimpleProps } from "./DProjectSimple";

export type EProjectPropsBase = {
    projectName: string;
}

export type EProjectProps<
    EP extends { [p: string]: any; }
> = EProjectPropsBase & (
    DProjectDetailedProps |
    DProjectSimpleProps |
    DProjectCustomProps<EP>
);

export type DProjectBaseProps = {
    project: Project;
}

export type DProjectCustomProps<P extends { [p: string]: any } = any> = {
    type?: "custom";
    component: (props: DProjectProps<P>) => JSX.Element;
} & Omit<P, "type">;

export type DProjectProps<DPP> = DProjectBaseProps & Omit<DPP, "type">;

export function EProject<EP extends { [p: string]: any; }>(
    {
        projectName,
        type = "simple",
        ...typedProps
    }: EProjectProps<EP>
) {
    const {
        projects
    } = useContext(SkillTreeContext);
    const project = projects[projectName];

    const renderedProject = useMemo(() => {
        switch (type) {
            case "detailed":
                return <DProjectDetailed
                    project={project}
                    {...typedProps as Omit<DProjectDetailedProps, "type">}
                />
            case "simple":
                return <DProjectSimple
                    project={project}
                    {...typedProps as Omit<DProjectSimpleProps, "type">}
                />
            case "custom":
                const {
                    component: CustomComponent,
                    ...other
                } = typedProps as Omit<DProjectCustomProps<EP>, "type">;
                return <CustomComponent
                    project={project}
                    {
                        ...other
                    }
                />
        }
    }, [
        project,
        type,
        typedProps
    ]);

    return renderedProject;
}
