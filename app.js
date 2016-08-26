// tutorial1.js
var CommentBox = React.createClass({
    render: function() {
	return (
	        <div className="commentBox">
		Hello, world! I am a CommentBox.aaaaa
		</div>
	);
    }
});
// tutorial2.js
var CommentList = React.createClass({
    render: function() {
	return (
	        <div className="commentList">
		Hello, world! I am a CommentList.
		</div>
	);
    }
});
var CommentForm = React.createClass({
    render: function() {
	return (
	        <div className="commentForm">
		Hello, world! I am a CommentForm.
		</div>
	);
    }
});
// tutorial3.js
var CommentBox = React.createClass({
    render: function() {
	return (
	        <div className="commentBox">
		<h1>Comments</h1>
		<CommentList />
		<CommentForm />
		</div>
	);
    }
});
// tutorial4.js
var Comment = React.createClass({
    render: function() {
	return (
	        <div className="comment">
		<h2 className="commentAuthor">
		{this.props.author}
	    </h2>
		{this.props.children}
	    </div>
	);
    }
});
// tutorial5.js
var CommentList = React.createClass({
    render: function() {
	return (
	        <div className="commentList">
		<Comment author="Pete Hunt">This is one comment</Comment>
		<Comment author="Jordan Walke">This is *another* comment</Comment>
		</div>
	);
    }
});
// tutorial6.js
var Comment = React.createClass({
    render: function() {
	var md = new Remarkable();
	return (
	        <div className="comment">
		<h2 className="commentAuthor">
		{this.props.author}
	    </h2>
		{md.render(this.props.children.toString())}
	    </div>
	);
    }
});
// tutorial7.js
var Comment = React.createClass({
    rawMarkup: function() {
	var md = new Remarkable({html:true});
	var rawMarkup = md.render(this.props.children.toString());
	return { __html: rawMarkup };
    },

    render: function() {
	return (
	        <div className="comment">
		<h2 className="commentAuthor">
		{this.props.author}
	    </h2>
		<span dangerouslySetInnerHTML={this.rawMarkup()} />
		</div>
	);
    }
});
// tutorial8.js
var data = [
    {id: 1, author: "Pete Hunt", text: "This is one comment"},
    {id: 2, author: "Jordan Walke", text: "This is *another* comment"},
    {id: 3, author: "池畑", text: "# 成二郎"}    
];
// tutorial9.js
var CommentBox = React.createClass({
    render: function() {
	return (
	        <div className="commentBox">
		<h1>Comments</h1>
		<CommentList data={this.props.data} />
		<CommentForm />
		</div>
	);
    }
});
// tutorial10.js
var CommentList = React.createClass({
    render: function() {
	console.log(this.props.data);
	var commentNodes = this.props.data.map(function (comment) {
	    return (
		    <Comment author={comment.author} key={comment.id}>
		    {comment.text}
		</Comment>
	    );
	});
	return (
	        <div className="commentList">
		{commentNodes}
	    </div>
	);
    }
});
// tutorial12.js
var CommentBox = React.createClass({
    getInitialState: function() {
	return {data: []};
    },
    render: function() {
	return (
	        <div className="commentBox">
		<h1>Comments</h1>
		<CommentList data={this.state.data} />
		<CommentForm />
		</div>
	);
    }
});
// tutorial13.js
var CommentBox = React.createClass({
    getInitialState: function() {
	return {data: []};
    },
    componentDidMount: function() {
	$.ajax({
	    url: this.props.url,
	    dataType: 'json',
	    cache: false,
	    success: function(data) {
		this.setState({data: data});
	    }.bind(this),
	    error: function(xhr, status, err) {
		console.error(this.props.url, status, err.toString());
	    }.bind(this)
	});
    },
    render: function() {
	return (
	        <div className="commentBox">
		<h1>Comments</h1>
		<CommentList data={this.state.data} />
		<CommentForm />
		</div>
	);
    }
});
// tutorial14.js
var CommentBox = React.createClass({
    loadCommentsFromServer: function() {
	$.ajax({
	    url: this.props.url,
	    dataType: 'json',
	    cache: false,
	    success: function(data) {
		console.log(data[0]);
		this.setState({data: data});
	    }.bind(this),
	    error: function(xhr, status, err) {
		console.error(this.props.url, status, err.toString());
	    }.bind(this)
	});
    },
    getInitialState: function() {
	return {data: []};
    },
    componentDidMount: function() {
	this.loadCommentsFromServer();
	setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
	return (
	        <div className="commentBox">
		<h1>Comments</h1>
		<CommentList data={this.state.data} />
		<CommentForm />
		</div>
	);
    }
});
// tutorial15.js
var CommentForm = React.createClass({
    render: function() {
	return (
	        <form className="commentForm">
		<input type="text" placeholder="Your name" />
		<input type="text" placeholder="Say something..." />
		<input type="submit" value="Post" />
		</form>
	);
    }
});
// tutorial16.js
var CommentForm = React.createClass({
    getInitialState: function() {
	return {author: '', text: ''};
    },
    handleAuthorChange: function(e) {
	this.setState({author: e.target.value});
    },
    handleTextChange: function(e) {
	this.setState({text: e.target.value});
    },
    render: function() {
	return (
	        <form className="commentForm">
		<input
	    type="text"
	    placeholder="Your name"
	    value={this.state.author}
	    onChange={this.handleAuthorChange}
	        />
		<input
	    type="text"
	    placeholder="Say something..."
	    value={this.state.text}
	    onChange={this.handleTextChange}
	        />
		<input type="submit" value="Post" />
		</form>
	);
    }
});
// tutorial19.js
var CommentForm = React.createClass({
    getInitialState: function() {
	return {author: '', text: ''};
    },
    handleAuthorChange: function(e) {
	this.setState({author: e.target.value});
    },
    handleTextChange: function(e) {
	this.setState({text: e.target.value});
    },
    handleSubmit: function(e) {
	e.preventDefault();
	var author = this.state.author.trim();
	var text = this.state.text.trim();
	if (!text || !author) {
	    return;
	}
	this.props.onCommentSubmit({author: author, text: text});
	this.setState({author: '', text: ''});
    },
    render: function() {
	return (
	        <form className="commentForm" onSubmit={this.handleSubmit}>
		<input
	    type="text"
	    placeholder="Your name"
	    value={this.state.author}
	    onChange={this.handleAuthorChange}
	        />
		<input
	    type="text"
	    placeholder="Say something..."
	    value={this.state.text}
	    onChange={this.handleTextChange}
	        />
		<input type="submit" value="Post" />
		</form>
	);
    }
});
// tutorial20.js
var CommentBox = React.createClass({
    loadCommentsFromServer: function() {
	$.ajax({
	    url: this.props.url,
	    dataType: 'json',
	    cache: false,
	    success: function(data) {
		this.setState({data: data});
	    }.bind(this),
	    error: function(xhr, status, err) {
		console.error(this.props.url, status, err.toString());
	    }.bind(this)
	});
    },
    handleCommentSubmit: function(comment) {
	$.ajax({
	    url: this.props.sayurl,
	    dataType: 'json',
	    type: 'POST',
	    data: comment,
	    success: function(data) {
		this.setState({data: data});
	    }.bind(this),
	    error: function(xhr, status, err) {
		console.error(this.props.sayurl, status, err.toString());
	    }.bind(this)
	});
    },
    getInitialState: function() {
	return {data: []};
    },
    componentDidMount: function() {
	this.loadCommentsFromServer();
	setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
	return (
	        <div className="commentBox">
		<h1>Comments</h1>
		<CommentList data={this.state.data} />
		<CommentForm onCommentSubmit={this.handleCommentSubmit} />
		</div>
	);
    }
});

// tutorial21.js
var CommentBox = React.createClass({
    loadCommentsFromServer: function() {
	$.ajax({
	    url: this.props.url,
	    dataType: 'json',
	    cache: false,
	    success: function(data) {
		this.setState({data: data});
	console.log("読み出し後");
	console.log(this.state.data);
	    }.bind(this),
	    error: function(xhr, status, err) {
		console.error(this.props.url, status, err.toString());
	    }.bind(this)
	});
    },
    handleCommentSubmit: function(comment) {
	var comments = this.state.data;
	// Optimistically set an id on the new comment. It will be replaced by an
	// id generated by the server. In a production application you would likely
	// not use Date.now() for this and would have a more robust system in place.
	comment.id = Date.now();
	var newComments = comments.concat([comment]);
	this.setState({data: newComments});
	console.log("書き出し前");
	console.log(newComments);
	setTimeout(function() {
          window.scroll(0,$(document).height());
        },0);
	$.ajax({
	    url: this.props.sayurl,
	    dataType: 'json',
	    type: 'POST',
	    data: comment,
	    success: function(data) {
		//this.setState({data: data});
	    }.bind(this),
	    error: function(xhr, status, err) {
		this.setState({data: comments});
		console.error(this.props.url, status, err.toString());
	    }.bind(this)
	});
    },
    getInitialState: function() {
	return {data: []};
    },
    componentDidMount: function() {
	this.loadCommentsFromServer();
	setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
	return (
	        <div className="commentBox">
		<h1>Comments</h1>
		<CommentList data={this.state.data} />
		<CommentForm onCommentSubmit={this.handleCommentSubmit} />
		</div>
	);
    }
});
/*
ReactDOM.render(
    <CommentBox data={data} />,
    document.getElementById('content')
);
*/
ReactDOM.render(
	<CommentBox url="./load.php" sayurl="./say.php" pollInterval={20000}/>,
    document.getElementById('content')
);
      
