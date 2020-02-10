FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-stage
WORKDIR /SpeedTestWeb

COPY /SpeedTestWeb/SpeedTestWeb.csproj ./
RUN dotnet restore

COPY /SpeedTestWeb ./
RUN dotnet publish \
    --output /PublishedApp \
    --configuration Release

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
LABEL repository="github.com/k8s-101/speedtest-api"
WORKDIR /SpeedTestWeb

COPY --from=build-stage /PublishedApp .
ENTRYPOINT ["dotnet", "SpeedTestWeb.dll"]
