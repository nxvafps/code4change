import { Level } from "../../seeds/utils/table-management";

const levels: Level[] = [
  { level: 1, name: "Beginner", xp_required: 0 },
  { level: 2, name: "Explorer", xp_required: 20 },
  { level: 3, name: "Developer", xp_required: 50 },
  { level: 4, name: "Contributor", xp_required: 100 },
  { level: 5, name: "Champion", xp_required: 200 },
  { level: 6, name: "Expert", xp_required: 350 },
  { level: 7, name: "Master", xp_required: 500 },
  { level: 8, name: "Guru", xp_required: 750 },
  { level: 9, name: "Legend", xp_required: 1000 },
  { level: 10, name: "Visionary", xp_required: 1500 },
];

export default levels;
