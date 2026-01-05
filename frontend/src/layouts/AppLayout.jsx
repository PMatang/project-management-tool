const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-ivory px-3 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
