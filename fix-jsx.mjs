import fs from "fs"
const path = "app/leaderboard/page.tsx"
let s = fs.readFileSync(path, "utf8")

// Convert static motion.div wrappers to div (keep motion.div with initial/animate)
const lines = s.split("\n")
const out = []
let depth = 0
for (let i = 0; i < lines.length; i++) {
  let line = lines[i]
  const isMotionAnimated =
    line.includes("<motion.div") &&
    (line.includes("initial=") ||
      (i + 1 < lines.length && lines[i + 1].includes("initial=")) ||
      line.includes("animate="))

  if (line.includes("<motion.div") && !isMotionAnimated) {
    line = line.replace(/<motion\.div/g, "<div")
  }
  if (line.includes("</motion.div>") && !line.includes("motion.div")) {
    // check if we're inside animated block - simplistic: if previous opens were div, close div
    line = line.replace(/<\/motion\.motion\.motion\.motion\.div>/g, "</motion.div>")
    line = line.replace(/<\/motion\.motion\.motion\.div>/g, "</motion.div>")
    line = line.replace(/<\/motion\.motion\.motion\.div>/g, "</motion.div>")
    line = line.replace(/<\/motion\.motion\.motion\.div>/g, "</motion.div>")
    line = line.replace(/<\/motion\.motion\.div>/g, "</motion.div>")
    line = line.replace(/<\/motion\.motion\.div>/g, "</motion.div>")
    line = line.replace(/<\/motion\.div>/g, "</motion.div>")
  }
  out.push(line)
}
s = out.join("\n")
// Fix main wrapper - should be div not motion.div for layout
s = s.replace('<motion.div className="flex-1 pt-24', '<div className="flex-1 pt-24')
s = s.replace('<motion.div className="container mx-auto', '<div className="container mx-auto')
s = s.replace('</motion.div>\n\n      <Footer', '</div>\n\n      <Footer')
// fix double closes at end of main content
fs.writeFileSync(path, s)
console.log("done")
