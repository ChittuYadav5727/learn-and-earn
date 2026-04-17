import { useEffect, useState } from 'react';
import SectionCard from '../../../components/common/SectionCard';
import { userService } from '../../../services/userService';

export default function CertificationPage() {
  const [questions, setQuestions] = useState([]);
  const [history, setHistory] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    userService.getCertificationExam().then(setQuestions).catch(() => setQuestions([]));
    userService.getCertificationHistory().then(setHistory).catch(() => setHistory([]));
  }, []);

  function selectAnswer(questionId, selectedOption) {
    setAnswers((current) => ({ ...current, [questionId]: selectedOption }));
  }

  async function submitExam() {
    try {
      const payload = Object.entries(answers).map(([questionId, selectedOption]) => ({
        questionId,
        selectedOption,
      }));

      const response = await userService.submitCertification(payload);
      setResult(response);
      const updatedHistory = await userService.getCertificationHistory();
      setHistory(updatedHistory);
    } catch (error) {
      setResult({
        isCertified: false,
        score: 0,
        certificateId: '',
        message: error.response?.data?.message || 'Could not submit exam.',
      });
    }
  }

  return (
    <div className="page-stack">
      <SectionCard title="Certification Exam" subtitle="A certificate is awarded only when the final score is above 70%.">
        <div className="stack-list">
          {questions.map((question) => (
            <article key={question.id} className="surface-card nested-card">
              <h3>{question.question}</h3>
              <div className="option-grid">
                {question.options.map((option) => (
                  <label key={option} className="option-card">
                    <input
                      checked={answers[question.id] === option}
                      name={question.id}
                      onChange={() => selectAnswer(question.id, option)}
                      type="radio"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </article>
          ))}
        </div>
        <button className="primary-button" onClick={submitExam} type="button">
          Submit exam
        </button>
        {result ? (
          <div className="result-card">
            <h3>{result.isCertified ? 'Certificate awarded' : 'Certificate not awarded'}</h3>
            <p>Score: {result.score}%</p>
            <p>
              Rule applied: {result.score} {result.score > 70 ? 'is above' : 'is not above'} 70%.
            </p>
            {result.certificateId ? <p>Certificate ID: {result.certificateId}</p> : null}
          </div>
        ) : null}
      </SectionCard>

      <SectionCard title="Certification history" subtitle="Separate from your profile, as required.">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Score</th>
                <th>Result</th>
                <th>Certificate</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item._id}>
                  <td>{new Date(item.attemptedAt).toLocaleDateString()}</td>
                  <td>{item.score}%</td>
                  <td>{item.result}</td>
                  <td>{item.certificateId || 'Not awarded'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
