const COMPONENT_BY_ACTION = {
  EDIT: ({ tronchx }) => {},
  CREATE: ({ tronchx }) => {},
  DELETE: ({ tronchx }) => {},
};

const Component = ({ action }) => {
  const ComponentWhichHandlesTheDesiredAction = COMPONENT_BY_ACTION[action];
  return <ComponentWhichHandlesTheDesiredAction />;
};

const Table = () => {
  if (action === "EDIT") {
    return <EditModal tronchxToEdit={} />;
  }
  if (action === "Create") {
    return <CreateModal />;
  }
  if (action === "Delete") {
    return <DeleteModal id={} />;
  }
};

const X = ({}) => {}