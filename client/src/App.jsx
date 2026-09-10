import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Landing from "./pages/Landing";
import LearnLanguageSelect from "./pages/LearnLanguageSelect";
import LearnDifficultySelect from "./pages/LearnDifficultySelect";
import LearnExerciseList from "./pages/LearnExerciseList";
import LearnExercise from "./pages/LearnExercise";
import CompetitiveMenu from "./pages/CompetitiveMenu";
import CompetitiveCreate from "./pages/CompetitiveCreate";
import CompetitiveJoin from "./pages/CompetitiveJoin";
import BattleRoom from "./pages/BattleRoom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<Layout />}>
        <Route path="/aprender" element={<LearnLanguageSelect />} />
        <Route path="/aprender/:language" element={<LearnDifficultySelect />} />
        <Route path="/aprender/:language/:difficulty" element={<LearnExerciseList />} />
        <Route
          path="/aprender/:language/:difficulty/:exerciseId"
          element={<LearnExercise />}
        />
        <Route path="/competitivo" element={<CompetitiveMenu />} />
        <Route path="/competitivo/criar" element={<CompetitiveCreate />} />
        <Route path="/competitivo/entrar" element={<CompetitiveJoin />} />
        <Route path="/competitivo/sala/:code" element={<BattleRoom />} />
      </Route>
    </Routes>
  );
}
