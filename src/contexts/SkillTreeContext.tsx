import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { SkillTree } from "../models/skill-tree";

const initialSkillTree = new SkillTree();

export const SkillTreeContext = createContext(initialSkillTree);

export type SkillTreeProviderProps = {
    skillTree: SkillTree
}

export function SkillTreeProvider(
    {
        children,
        skillTree: skillTreeProp
    }: PropsWithChildren<SkillTreeProviderProps>
) {
    const [skillTree, setSkillTree] = useState(skillTreeProp);

    useEffect(() => {
        setSkillTree(skillTreeProp._addSetter(setSkillTree));
    }, [
        skillTreeProp
    ]);

    return <SkillTreeContext.Provider value={skillTree}>
        {
            children
        }
    </SkillTreeContext.Provider>
}
