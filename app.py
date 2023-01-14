from flask import Flask, request, render_template, redirect, flash, session
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
    return render_template("homepage.html",title="Boggle Time Baby",content=curr_board,guesslist=guesslist)

@app.route('/newboard',methods=["POST"])
def newboard():
    """Generate a new board then redirect to the homepage."""
    boggle_board = boggle_game.make_board()
    session['board'] = boggle_board
    session['guesslist'] = []
    return redirect("/")

@app.route('/checkword/<word>',methods=["POST"])
def check_word(word):
    """Check if guess is in board and add to list if so."""
    curr_guesses = session['guesslist']
    # word = request.form['word']
    boggle_board = session['board']
    if boggle_game.check_valid_word(boggle_board, word) == "ok":
        word += " (is in)"
    curr_guesses.append(word)
    session['guesslist'] = curr_guesses
    return redirect("/")