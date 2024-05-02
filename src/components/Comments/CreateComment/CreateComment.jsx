const CreateComment = ({ postComment, value, updateText }) => {
    const handleInputChange = (e) => {
        const { name, value: inputValue } = e.target;
        updateText({ ...value, [name]: inputValue });
    };

    const handleSubmit = () => {

        console.log(value)
        postComment(value);
        updateText({ title: "", body: "" }); // Clear input fields after posting comment
    };



    return (
        <div>
            <input
                type="text"
                name="title"
                value={value.title}
                onChange={handleInputChange}
                placeholder="Title"
            />
            <input
                type="text"
                name="body"
                value={value.body}
                onChange={handleInputChange}
                placeholder="Comment Text"
            />
            <button onClick={handleSubmit}>Post Comment</button>
        </div>
    );
};

export default CreateComment;
