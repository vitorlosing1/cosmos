const ReloadPage = () => {
  if (window.location.pathname === "/") {
    window.location.reload();
  }
};

export default ReloadPage;
