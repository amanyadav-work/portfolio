const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-light" style={{minHeight: '100vh'}}>
      <h1 className="display-1 fw-bolder mb-2" style={{fontSize: '8rem'}}>404</h1>
      <p className="mb-3 fs-6 fst-italic">Looks like you've ventured off the map.!</p>
    </div>
  );
};

export default NotFound;