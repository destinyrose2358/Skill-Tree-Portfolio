import { Dispatch, SetStateAction } from "react";
import { Project, ProjectCollection, ProjectData } from "./project";
import { Skill, SkillCollection, SkillData } from "./skill";

export type SkillTreeData = {
    skills?: SkillCollection;
    projects?: ProjectCollection;
    setter?: Dispatch<SetStateAction<SkillTree>>
}

export class SkillTree {
    skills: SkillCollection;
    projects: ProjectCollection;
    setter?: Dispatch<SetStateAction<SkillTree>>

    constructor(
        skills: SkillCollection = {},
        projects: ProjectCollection = {},
        setter?: Dispatch<SetStateAction<SkillTree>>
    ) {
        this.skills = skills;
        this.projects = projects;
        this.setter = setter;
    }

    private copy(
        {
            skills = this.skills,
            projects = this.projects
        }: Partial<SkillTreeData>
    ) {
        const newSkillTree = new SkillTree(
            skills,
            projects
        );
        this.setter && this.setter(newSkillTree);
        return newSkillTree;
    }

    _addSetter(setter: Dispatch<SetStateAction<SkillTree>>) {
        return this.copy(
            {
                setter
            }
        );
    }

    addSkill(skill: SkillData) {
        if (Object.keys(this.skills).includes(skill.name)) {
            // a skill already exists
            throw `${skill.name} already exists, please remove duplicates`
        } else {
            return this.copy({
                skills: {
                    ...this.skills,
                    [skill.name]: new Skill(skill)
                }
            });
        }
    }

    addProject(project: ProjectData) {
        if (Object.keys(this.projects).includes(project.name)) {
            // a project already exists
            throw `${project.name} already exists, please remove duplicates`
        } else {
            return this.copy({
                projects: {
                    ...this.projects,
                    [project.name]: new Project(project)
                }
            });
        }
    }

    addSubSkillTo(subSkillName: string, superSkillName: string) {
        return this.copy({
            skills: {
                ...this.skills,
                [superSkillName]: this.skills[superSkillName]._addSubSkill(subSkillName),
                [subSkillName]: this.skills[subSkillName]._addSuperSkill(superSkillName)
            }
        });
    }

    addSkillToProject(skillName: string, projectName: string) {
        return this.copy({
            skills: {
                ...this.skills,
                [skillName]: this.skills[skillName]._addProject(projectName)
            },
            projects: {
                ...this.projects,
                [projectName]: this.projects[projectName]._addSkill(skillName)
            }
        })
    }
}
