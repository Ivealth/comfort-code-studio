import { useState, FormEvent } from "react";

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [spotsLeft, setSpotsLeft] = useState(118);

  const validateEmail = (v: string) => {
    return v.includes('@') && v.includes('.');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setSuccess("Thanks — you're on the list! We'll email you soon.");
    setEmail("");
    setUniversity("");
    setPainPoint("");
    setSpotsLeft((s) => Math.max(0, s - 1));
  };

  return (
    <section id="waitlist" className="mt-6">
      <div className="bg-card rounded-lg p-4 shadow-blue-subtle">
        <h3 className="text-center text-lg font-heading font-bold">Join the Waitlist</h3>

        <form onSubmit={handleSubmit} className="mt-3 space-y-2">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email *"
              className="w-full text-sm placeholder:text-muted-foreground px-3 py-2 rounded-lg bg-orange-50 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label htmlFor="university" className="sr-only">
              University
            </label>
            <input
              id="university"
              type="text"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="Your University (optional)"
              className="w-full text-sm placeholder:text-muted-foreground px-3 py-2 rounded-lg bg-orange-50 border border-transparent focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="pain" className="sr-only">
              What's your biggest campus headache?
            </label>
            <textarea
              id="pain"
              rows={3}
              value={painPoint}
              onChange={(e) => setPainPoint(e.target.value)}
              placeholder="What's your biggest campus headache? (optional)"
              className="w-full text-sm placeholder:text-muted-foreground px-3 py-2 rounded-lg bg-orange-50 border border-transparent focus:outline-none resize-none"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-md text-primary-foreground bg-primary font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Sign Me Up
            </button>
          </div>

          <div className="mt-2">
            <div className="mt-2 text-sm text-center text-muted-foreground">
              Spots filling fast – only{' '}
              <span className="font-semibold text-foreground">{spotsLeft}</span> left!
            </div>

            {error && <div className="mt-1 text-sm text-destructive">{error}</div>}
            {success && <div className="mt-1 text-sm text-green-600">{success}</div>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default WaitlistForm;
