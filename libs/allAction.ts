export async function getDailyWork() {
    const res = await fetch("/api/daily-work",{cache:"no-store"});
    const data =await res.json();
    return data.data;
  }
