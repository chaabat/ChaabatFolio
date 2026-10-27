#!/usr/bin/env bash
# Stage 5 - project screenshots. Run from the ROOT of your repo.
# 1) Put your screenshots in src/assets/projects/ named <project-id>.png (see list below)
# 2) bash stage5-images.sh "/path/to/template"
set -euo pipefail

T="${1:?Usage: bash stage5-images.sh \"/path/to/template\"}"
mkdir -p scripts
cp "$T/scripts/generate-responsive-project-images.mjs" "$T/scripts/check-responsive-project-images.mjs" scripts/

IDS="assurance-company nostalgia justcash citronix school-management greentogether parents-pearl siae flyer livriliya assurcorp naturacorp sentinel-x"
OLD="abb-cynk-portal bachelors-thesis equiniti-design-system equiniti-website groupware-knowledge-platform help-and-support interactive-3d-portfolio intouch it-services kvl-security-device masters-thesis onboarding-solution power-analyser shareowner-online taia-accelerator"
DIR=src/assets/projects

# 1. Remove OLD's screenshots and generated files
for k in $OLD; do rm -f "$DIR/$k.png" "$DIR/$k.webp"; done
rm -rf "$DIR/responsive"

# 2. Keep only the projects that have a screenshot
FOUND=""
for id in $IDS; do
  if [ -f "$DIR/$id.png" ]; then FOUND="$FOUND $id"; else echo "no image yet: $id.png"; fi
done
[ -n "$FOUND" ] || { echo "No <id>.png found in $DIR"; exit 1; }

# 3. Patch the generator, the checker and the typing
FOUND="$FOUND" py -3 - <<'PY'
import os,re
ids=os.environ['FOUND'].split()
p='scripts/generate-responsive-project-images.mjs'
s=open(p,encoding='utf-8').read()
block="const projectConfigs = [\n"+"".join(f"    {{ id: '{i}' }},\n" for i in ids)+"];"
s=re.sub(r"const projectConfigs = \[.*?\n\];",lambda m:block,s,flags=re.S)
open(p,'w',encoding='utf-8').write(s)

p='scripts/check-responsive-project-images.mjs'
s=open(p,encoding='utf-8').read()
s=s.replace("['groupware-knowledge-platform', 'kvl-security-device']","[]")
open(p,'w',encoding='utf-8').write(s)

p='src/sections/projects/projectImageAssets.ts'
s=open(p,encoding='utf-8').read()
if 'interface ManifestEntry' not in s:
    s=s.replace("interface ProjectImageSet {","""interface ManifestVariant {
    filename: string;
    width: number;
}

interface ManifestEntry {
    id: string;
    width: number;
    height: number;
    previewVariants: ManifestVariant[];
    detailVariants: ManifestVariant[];
    detailOriginal?: ManifestVariant;
}

interface ProjectImageSet {""",1)
    s=s.replace("responsiveManifest.map((entry) => {","(responsiveManifest as ManifestEntry[]).map((entry) => {",1)
    open(p,'w',encoding='utf-8').write(s)
PY

# 4. Generate the responsive sizes and check
npm run images:generate
npm run images:check
npm run typecheck
echo "Done. Projects with images:$FOUND"
