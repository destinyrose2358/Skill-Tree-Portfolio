import './App.css';
import { SKILLTREE } from './data/skill-tree';
import { ESkill } from './components/skill/ESkill';
import { EProject } from './components/project/EProject';
import { DSkillDetailed } from './components/skill/DSkillDetailed';

function App() {
  return (
    <div className="App">
      {
        Object.keys(SKILLTREE.skills).map((skill) => <ESkill
          type={"custom"}
          component={DSkillDetailed}
          styles={{
            container: {},
            text: {},
            list: {}
          }}
          skillName={skill}
        />)
      }
      {
        Object.keys(SKILLTREE.projects).map((project) => <EProject
          type={"simple"}
          projectName={project}
        />)
      }
    </div>
  );
}

export default App;
