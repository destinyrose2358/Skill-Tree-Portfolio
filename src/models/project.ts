
export type TodoProjStat = "todo";
export type WIPProjStat = "wip";
export type CompletedProjStat = "completed";
export type ProjectStatus = TodoProjStat |
    WIPProjStat |
    CompletedProjStat;

export type ProjectData = {
    name: string;
    description: string;
    url: string;
    status: ProjectStatus;
    skills?: string[];
    dependents?: string[];
    dependencies?: string[];
}

export type ProjectCollection = {
    [p: string]: Project;
}

export class Project {
    name: string;
    description: string;
    url: string;
    status: ProjectStatus;
    skills: string[];
    dependents: string[];
    dependencies: string[];

    constructor(
        {
            name,
            description,
            url,
            status,
            skills,
            dependents,
            dependencies
        }: ProjectData
    ) {
        this.name = name;
        this.description = description;
        this.url = url;
        this.status = status;
        this.skills = Array.from(new Set(skills));
        this.dependents = Array.from(new Set(dependents));
        this.dependencies = Array.from(new Set(dependencies));
    }

    private copy(
        {
            name = this.name,
            description = this.description,
            url = this.url,
            status = this.status,
            skills = this.skills,
            dependents = this.dependents,
            dependencies = this.dependencies
        }: Partial<ProjectData>
    ) {
        return new Project({
            name,
            description,
            url,
            status,
            skills,
            dependents,
            dependencies
        });
    }

    _addSkill(skill: string) {
        return this.copy({
            skills: [
                ...this.skills,
                skill
            ]
        });
    }

    _addDependent(project: string) {
        if (new Set(this.dependents).has(project)) {
            // this dependent is already assigned
            return this;
        } else {
            return this.copy({
                dependents: [
                    ...this.dependents,
                    project
                ]
            });
        }
    }

    _addDependency(project: string) {
        if (new Set(this.dependencies).has(project)) {
            // this dependency is already assigned
            return this;
        } else {
            return this.copy({
                dependencies: [
                    ...this.dependencies,
                    project
                ]
            });
        }
    }
}
