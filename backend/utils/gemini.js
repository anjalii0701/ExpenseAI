import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.error("⚠️ GEMINI_API_KEY is not set.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const stripMarkdown = (text) => {
  let cleaned = text.trim();

  if (cleaned.startsWith("```json")) {
    cleaned = cleaned
      .replace(/```json\s*/g, "")
      .replace(/```\s*$/g, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned
      .replace(/```\s*/g, "")
      .replace(/```\s*$/g, "");
  }

  return cleaned.trim();
};

const generateAIResponse = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);

    const response = result.response;
    const text = response.text();

    // console.log("\n========== GEMINI RAW RESPONSE ==========");
    // console.log(text);
    // console.log("=========================================\n");

    const cleaned = stripMarkdown(text);

    try {
      return JSON.parse(cleaned);
    } catch (parseError) {
      // console.error("JSON Parse Error:", parseError);
      // console.error("Gemini returned:");
      // console.error(cleaned);

      throw new Error("Gemini returned invalid JSON.");
    }
  } catch (error) {
    // console.error("\n========== GEMINI API ERROR ==========");
    // console.error(error);
    // console.error("======================================\n");
    throw error;
  }
};

export const generateMonthlyInsight = async ({
  totalIncome,
  totalExpenses,
  savingsRate,
  expenseBreakdown,
  previousMonths,
  currency = "INR",
}) => {
  const breakdownText =
    expenseBreakdown.length > 0
      ? expenseBreakdown
          .map(
            (c) =>
              `- ${c.category}: ${currency} ${Number(c.amount).toFixed(2)}`
          )
          .join("\n")
      : "- No expense breakdown data";

  const trendText =
    previousMonths.length > 0
      ? previousMonths
          .map(
            (m) =>
              `- ${m.month}: Income ${currency} ${Number(
                m.income
              ).toFixed(2)}, Expenses ${currency} ${Number(
                m.expenses
              ).toFixed(2)}`
          )
          .join("\n")
      : "- No previous month data available";

  const prompt = `
Analyze this user's monthly financial data.

Currency: ${currency}

Income: ${currency} ${Number(totalIncome).toFixed(2)}
Expenses: ${currency} ${Number(totalExpenses).toFixed(2)}
Savings Rate: ${Number(savingsRate).toFixed(1)}%

Expense Breakdown:
${breakdownText}

Previous Months:
${trendText}

Return ONLY JSON:

{
  "summary":"",
  "highlights":["",""],
  "concerns":["",""],
  "recommendations":[
    {
      "title":"",
      "detail":""
    },
    {
      "title":"",
      "detail":""
    },
    {
      "title":"",
      "detail":""
    }
  ],
  "topSpendingCategory":"",
  "estimatedMonthlySavings":0,
  "healthScore":0
}
`;

  try {
    return await generateAIResponse(prompt);
  } catch (err) {
    console.error(err);
    // throw new Error("Failed to generate monthly insight.");
    throw err;
  }
};

export const generateBudgetAlert = async ({
  categoryName,
  budgetAmount,
  spentAmount,
  daysIntoPeriod,
  totalPeriodDays,
  currency = "INR",
}) => {
  const percentUsed = ((spentAmount / budgetAmount) * 100).toFixed(1);
  const daysLeft = totalPeriodDays - daysIntoPeriod;

  const prompt = `
Category: ${categoryName}

Budget: ${currency} ${Number(budgetAmount).toFixed(2)}
Spent: ${currency} ${Number(spentAmount).toFixed(2)}

${percentUsed}% used.

${daysLeft} days remaining.

Return ONLY JSON

{
  "severity":"",
  "title":"",
  "message":"",
  "suggestions":["","",""]
}
`;

  try {
    return await generateAIResponse(prompt);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to generate budget alert.");
  }
};

export const generateSavingsTips = async ({
  topCategories,
  monthlyIncome,
  currency = "INR",
}) => {
  const categoryText =
    topCategories.length > 0
      ? topCategories
          .map(
            (c) =>
              `${c.category}: ${currency} ${Number(c.amount).toFixed(
                2
              )} (${c.transactionCount} transactions)`
          )
          .join("\n")
      : "- No spending data";

  const prompt = `
Monthly Income:

${currency} ${Number(monthlyIncome).toFixed(2)}

Top Categories:

${categoryText}

Return ONLY JSON

{
  "overallTip":"",
  "tips":[
    {
      "category":"",
      "title":"",
      "detail":"",
      "estimatedSavings":0
    },
    {
      "category":"",
      "title":"",
      "detail":"",
      "estimatedSavings":0
    },
    {
      "category":"",
      "title":"",
      "detail":"",
      "estimatedSavings":0
    },
    {
      "category":"",
      "title":"",
      "detail":"",
      "estimatedSavings":0
    }
  ]
}
`;

  try {
    return await generateAIResponse(prompt);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to generate savings tips.");
  }
};

export const analyzeTransactionList = async ({
  transactions,
  currency = "INR",
}) => {
  const lines = transactions
    .slice(0, 50)
    .map((t) => {
      const date = new Date(t.transaction_date)
        .toISOString()
        .split("T")[0];

      return `- ${date}: ${t.type} ${currency} ${Number(t.amount).toFixed(
        2
      )} | ${t.category_name || "Uncategorized"} ${
        t.description || ""
      }`;
    })
    .join("\n");

  const prompt = `
Analyze these transactions.

${lines}

Return ONLY JSON

{
  "insight":"",
  "highlight":""
}
`;

  try {
    return await generateAIResponse(prompt);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to analyze transactions.");
  }
};

export const analyzeBudgetList = async ({
  budgets,
  currency = "INR",
}) => {
  const lines = budgets
    .map((b) => {
      const spent = Number(b.spent);
      const total = Number(b.amount);

      const pct =
        total > 0 ? ((spent / total) * 100).toFixed(1) : "0";

      return `Budget ${b.id}
Category:${b.category_name}
Limit:${currency} ${total.toFixed(2)}
Spent:${currency} ${spent.toFixed(2)}
${pct}%`;
    })
    .join("\n\n");

  const prompt = `
Analyze these budgets.

${lines}

Return ONLY JSON

{
  "analyses":[
    {
      "budgetId":0,
      "status":"",
      "message":""
    }
  ]
}
`;

  try {
    return await generateAIResponse(prompt);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to analyze budgets.");
  }
};

export default {
  generateMonthlyInsight,
  generateBudgetAlert,
  generateSavingsTips,
  analyzeTransactionList,
  analyzeBudgetList,
};