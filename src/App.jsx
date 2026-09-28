import './App.css';
import { useState } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [click, setClick] = useState('');
  const [modal, setModal] = useState(false);
  const [idStore, setIdStore] = useState(null);
  const [editmodal, seteditModal] = useState(false);
  const [edit, setEdit] = useState('');
  const [filter, setFilter] = useState('all');

  const changeFunction = e => {
    setClick(e.target.value);
  };

  const clickFunction = () => {
    if (click.trim()) {
      setData([...data, { txt: click, isChecked: false, id: Date.now() }]);
      setClick('');
    }
  };

  const deleteFunction = id => {
    setModal(true);
    setIdStore(id);
  };

  const deleteComplete = () => {
    const mainData = data.filter(item => {
      return item.id !== idStore;
    });

    setData(mainData);
    setModal(false);
  };

  const editOpen = id => {
    seteditModal(true);

    const mainData = data.find(item => {
      return item.id == id;
    });

    setEdit(mainData.txt);
    setIdStore(id);
  };

  const editChange = e => {
    setEdit(e.target.value);
  };

  const editComplete = () => {
    let todoCopy = [...data];

    let mainData = todoCopy.find(item => {
      return item.id === idStore;
    });

    mainData.txt = edit;

    setData(todoCopy);
    seteditModal(false);
  };

  const isCheckedOrNot = id => {
    let todoCopy = [...data];

    const mainData = todoCopy.find(item => {
      return item.id == id;
    });

    mainData.isChecked = !mainData.isChecked;

    setData(todoCopy);
  };

  const filterFunction = () => {
    if (filter === 'all') {
      return data;
    } else if (filter === 'pending') {
      return data.filter(item => {
        return item.isChecked == false;
      });
    } else if (filter === 'completed') {
      return data.filter(item => {
        return item.isChecked == true;
      });
    }
  };

  const completedCount = data.filter(item => item.isChecked).length;

  return (
    <div className="todo-page">
      <div className="todo-container">
        <h1 className="todo-title">TODO APP</h1>

        <div className="empty-div"></div>

        <div className="todo-header">
          <div>
            <p className="todo-subtitle">Stay organized. Get things done.</p>

            <div className="todo-stats">
              <span>{data.length} Total</span>
              <span>{completedCount} Completed</span>
            </div>
          </div>
        </div>

        <div className="todo-input-section">
          <input
            className="todo-input"
            value={click}
            onChange={changeFunction}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                clickFunction();
              }
            }}
            type="text"
            placeholder="What needs to be done?"
          />

          <button className="add-button" onClick={clickFunction}>
            + Add Task
          </button>
        </div>

        <div className="filter-section">
          <button
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => {
              setFilter('all');
            }}
          >
            All
          </button>

          <button
            className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => {
              setFilter('pending');
            }}
          >
            Pending
          </button>

          <button
            className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => {
              setFilter('completed');
            }}
          >
            Completed
          </button>
        </div>

        <div className="task-section">
          {filterFunction().length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✓</div>
              <h2>No tasks here</h2>
              <p>Add a task above and start getting things done.</p>
            </div>
          ) : (
            <div className="task-list">
              {filterFunction().map(item => {
                return (
                  <div
                    key={item.id}
                    className={`task-card ${
                      item.isChecked ? 'completed-task' : ''
                    }`}
                  >
                    <div className="task-left">
                      <input
                        className="task-checkbox"
                        checked={item.isChecked}
                        onChange={() => {
                          isCheckedOrNot(item.id);
                        }}
                        type="checkbox"
                      />

                      <li className="task-text">{item.txt}</li>
                    </div>

                    <div className="task-actions">
                      <button
                        className="edit-button"
                        onClick={() => {
                          editOpen(item.id);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => {
                          deleteFunction(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* DELETE MODAL */}
      <div className={`modal-overlay ${modal ? 'modal-visible' : ''}`}>
        <div className="modal-card">
          <div className="modal-icon delete-icon">!</div>

          <h2>Delete task?</h2>

          <p>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </p>

          <div className="modal-actions">
            <button
              className="modal-cancel"
              onClick={() => {
                setModal(false);
              }}
            >
              Cancel
            </button>

            <button
              className="modal-confirm delete-confirm"
              onClick={deleteComplete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <div className={`modal-overlay ${editmodal ? 'modal-visible' : ''}`}>
        <div className="modal-card">
          <div className="modal-icon edit-icon">✎</div>

          <h2>Edit task</h2>

          <p>Update your task and save the changes.</p>

          <input
            className="edit-input"
            value={edit}
            onChange={editChange}
            type="text"
            autoFocus
          />

          <div className="modal-actions">
            <button
              className="modal-cancel"
              onClick={() => {
                seteditModal(false);
              }}
            >
              Cancel
            </button>

            <button
              className="modal-confirm save-confirm"
              onClick={editComplete}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
