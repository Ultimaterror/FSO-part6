import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification, removeNotification } from "../reducers/notificationReducer";

export default function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(String(filter).toLowerCase())
    )
  );

  function handleClick(anecdote) {
    dispatch(addVote(anecdote));
    dispatch(setNotification(`Voted for '${anecdote.content}'`, 2));
  }

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => handleClick(anecdote)}
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
