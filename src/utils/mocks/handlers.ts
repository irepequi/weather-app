import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(
    "https://api.openweathermap.org/data/2.5/forecast",
    ({ request }) => {
      const url = new URL(request.url);
      const city = url.searchParams.get("q");

      if (city === "London") {
        return HttpResponse.json({
          city: { name: "London" },
          list: [{ main: { temp: 15 } }],
        });
      }

      return new HttpResponse("City not found", { status: 404 });
    }
  ),
];
