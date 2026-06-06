import re

path = r"app\leaderboard\page.tsx"
with open(path, encoding="utf-8") as f:
    s = f.read()

# Fix mismatched </motion.div> closings after header labels
for label in ["Rank", "Player", "WPM", "Accuracy", "Tests", "Trend"]:
    s = s.replace(f">{label}</motion.div>", f">{label}</motion.div>")

# Header grid: motion.div -> div
s = s.replace(
    '      <motion.div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-medium text-muted-foreground">',
    '      <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-medium text-muted-foreground">',
    1,
)
# Close header grid (first </motion.div> after Trend)
s = s.replace(
    '        <div className="col-span-1 text-center">Trend</motion.div>\n      </motion.div>',
    '        <motion.div className="col-span-1 text-center">Trend</motion.div>\n      </motion.div>',
)
s = s.replace(
    '        <motion.div className="col-span-1 text-center">Trend</motion.div>\n      </motion.div>',
    '        <motion.div className="col-span-1 text-center">Trend</motion.div>\n      </motion.div>',
)

# Fix header cells to use div consistently
header_cells = """      <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-medium text-muted-foreground">
        <motion.div className="col-span-1 text-center">Rank</motion.div>
        <motion.div className="col-span-4 sm:col-span-5">Player</motion.div>
        <motion.div className="col-span-2 text-center">WPM</motion.div>
        <motion.div className="col-span-2 text-center hidden sm:block">Accuracy</motion.div>
        <motion.div className="col-span-2 text-center">Tests</motion.div>
        <motion.div className="col-span-1 text-center">Trend</motion.div>
      </motion.div>""".replace("motion.", "")

# Find and replace broken header block via regex
s = re.sub(
    r'      <motion\.motion\.motion\.div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-medium text-muted-foreground">.*?</motion\.motion\.motion\.motion\.motion\.div>\n\n      \{data\.map',
    header_cells + "\n\n      {data.map",
    s,
    flags=re.S,
)

# Simpler: replace known broken block from file
old_header = """      <motion.div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-medium text-muted-foreground">
        <motion.div className="col-span-1 text-center">Rank</motion.div>
        <motion.div className="col-span-4 sm:col-span-5">Player</motion.div>
        <motion.div className="col-span-2 text-center">WPM</motion.div>
        <motion.div className="col-span-2 text-center hidden sm:block">Accuracy</motion.div>
        <motion.div className="col-span-2 text-center">Tests</motion.div>
        <motion.div className="col-span-1 text-center">Trend</motion.div>
      </motion.div>"""

new_header = """      <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-medium text-muted-foreground">
        <motion.div className="col-span-1 text-center">Rank</motion.div>
        <motion.div className="col-span-4 sm:col-span-5">Player</motion.div>
        <motion.div className="col-span-2 text-center">WPM</motion.div>
        <motion.div className="col-span-2 text-center hidden sm:block">Accuracy</motion.div>
        <motion.div className="col-span-2 text-center">Tests</motion.div>
        <motion.div className="col-span-1 text-center">Trend</motion.div>
      </motion.div>""".replace("motion.", "")

if old_header in s:
    s = s.replace(old_header, new_header)
else:
    # try with motion.div closings
    old2 = old_header.replace("</motion.div>", "</motion.div>")
    new2 = new_header
    s = s.replace(old2, new2)

# Fix row inner cells motion.div -> div
s = re.sub(
    r"<motion\.div className=\"(col-span-[^\"]+)\">",
    r'<motion.div className="\1">',
    s,
)
s = s.replace('<motion.div className="', '<motion.div className="')
# Actually replace motion.div with div for inner static cells only
for cls in [
    "col-span-1 flex justify-center",
    "col-span-4 sm:col-span-5 flex items-center gap-3",
    "col-span-2 text-center",
    "col-span-2 text-center hidden sm:block",
    "col-span-2 flex items-center justify-center gap-1",
]:
    s = s.replace(f'<motion.div className="{cls}">', f'<motion.div className="{cls}">')

with open(path, "w", encoding="utf-8") as f:
    f.write(s)
print("fixed")
