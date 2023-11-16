import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      dispatch({type: "SET", payload : `Added ${anecdote.content}`})
      setTimeout(() => {
        dispatch({type: "CLEAR"});
      }, 5000);
    },
    onError: (err) => {
      dispatch({type: "SET", payload : err.response.data.error})
      setTimeout(() => {
        dispatch({type: "CLEAR"});
      }, 5000);
    }
  });

  const onCreate = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
