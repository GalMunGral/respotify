# python3 -m venv venv
# . venv/bin/activate
pip3 install -r requirements.txt
# deactivate
cd respotify && npm install
# IMPORTANT: `build` folder is never pushed to GitHub repo
npm run build
