from flask import Flask, jsonify

app = Flask('guess number')

@app.route('/guess', methods=['POST'])
def guess():
  return "hello"

@app.route('/leaderboard')
def leaderboard():
  return jsonify([])

@app.route('/history/<name>')
def history(name):
  return jsonify([])

if __name__ == '__main__':
  app.run(debug=True, port=5000)
