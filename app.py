from flask import Flask, request, render_template, redirect, flash, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension #bring in DTE
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret" #define something

debug = DebugToolbarExtension(app) #define debug fn
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False #turns off debugging intercepts

boggle_game = Boggle()

@app.route('/',methods=["GET"])
def homepage():
    """Homepage."""
    if 'board' in session:
        curr_board = session['board']
    else:
        curr_board = ["press","make","board","to","start"]
    if 'guesslist' in session:
        guesslist = session['guesslist']
    else:
        guesslist = []
    if 'highscores' in session:
        highscores = session['highscores']
    else:
        highscores = []
    return render_template("homepage.html",title="Boggle Time Baby",content=curr_board,guesslist=guesslist,highscores=highscores)

@app.route('/newboard',methods=["POST"])
def newboard():
    """Generate a new board then redirect to the homepage."""
    boggle_board = boggle_game.make_board()
    session['board'] = boggle_board
    session['score'] = 0
    session['guesslist'] = []
    return redirect("/")

@app.route('/endgame/<int:score>',methods=["POST"])
def endgame(score):
    """Update the high scores session."""
    highscores = session.get('highscores',[])
    highscores.append(score)
    session['highscores'] = highscores
    return redirect("/")

@app.route('/checkword/<word>',methods=["POST"])
def check_word(word):
    """Check if guess is in board and add to list if so."""
    score = session.get("score",0)
    curr_guesses = session['guesslist']
    boggle_board = session['board']
    #is this word already in the guess list?
    if word in curr_guesses:
        info = {"result": "already-guessed"}
        return jsonify(info)
    #Check and see if this is a word in the dictionary
    if boggle_game.check_valid_word(boggle_board, word) == "ok":
        curr_guesses.append(word)
        session['guesslist'] = curr_guesses
        score += len(word)
        session['score'] = score
    result = boggle_game.check_valid_word(boggle_board, word)
    info = {"result": result,"score": score}
    return jsonify(info)