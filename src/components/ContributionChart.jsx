import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

function ContributionChart({ edits }) {
    if (!edits || edits.length === 0) return null;

    // Count edits by wiki
    const wikiCounts = edits.reduce((acc, edit) => {
        const wiki = edit.project || edit.wiki;
        acc[wiki] = (acc[wiki] || 0) + 1;
        return acc;
    }, {});

    const labels = Object.keys(wikiCounts);
    const data = Object.values(wikiCounts);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Contributions',
                data,
                backgroundColor: [
                    '#60a5fa', '#fbbf24', '#34d399', '#f87171', '#a78bfa', '#f472b6', '#38bdf8', '#facc15', '#4ade80', '#fb7185',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="max-w-md mx-auto my-8">
            <h3 className="text-xl font-semibold mb-4 text-center">Contribution Breakdown by Wiki</h3>
            <Pie data={chartData} />
        </div>
    );
}

export default ContributionChart;
