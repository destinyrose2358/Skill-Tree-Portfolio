
export type SkillData = {
    name: string;
    description: string;
    subSkills?: string[];
    superSkills?: string[];
    projects?: string[];
}

export type SkillCollection = {
    [p: string]: Skill;
}

export class Skill {
    name: string;
    description: string;
    subSkills: string[];
    superSkills: string[];
    projects: string[];

    constructor(
        {
            name,
            description,
            subSkills,
            superSkills,
            projects
        }: SkillData
    ) {
        this.name = name;
        this.description = description;
        // protect against repeats
        this.subSkills = Array.from(new Set(subSkills));
        this.superSkills = Array.from(new Set(superSkills));
        this.projects = Array.from(new Set(projects));
    }

    private copy(
        {
            name = this.name,
            description = this.description,
            subSkills = this.subSkills,
            superSkills = this.superSkills,
            projects = this.projects
        }: Partial<SkillData>
    ) {
        return new Skill({
            name,
            description,
            subSkills,
            superSkills,
            projects
        });
    }

    _addSubSkill(skill: string) {
        if (new Set(this.subSkills).has(skill)) {
            // there is already a subskill of this name
            return this;
        } else {
            return this.copy({
                subSkills: [...this.subSkills, skill]
            });
            // the reverse connection isn't enforced yet
        }
    }

    _addSuperSkill(skill: string) {
        if (new Set(this.subSkills).has(skill)) {
            // there is already a superskill of this name
            return this;
        } else {
            return this.copy({
                superSkills: [...this.superSkills, skill]
            });
            // the reverse connection isn't enforced yet
        }
    }

    _addProject(project: string) {
        if (new Set(this.projects).has(project)) {
            return this;
        } else {
            return this.copy({
                projects: [...this.projects, project]
            })
        }
    }
}
