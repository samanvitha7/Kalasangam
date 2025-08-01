function HomeMinimal() {
  return (
    <div className="min-h-screen bg-warm-sand p-8">
      <h1 className="text-4xl font-bold text-deep-teal mb-4">
        Kala Sangam - Minimal Home
      </h1>
      <p className="text-deep-charcoal text-lg">
        This is a minimal version of the home page to test if the error comes from the Home component.
      </p>
      <div className="mt-8">
        <button className="bg-deep-teal text-warm-sand px-6 py-3 rounded-lg font-semibold">
          Test Button
        </button>
      </div>
    </div>
  );
}

export default HomeMinimal;
