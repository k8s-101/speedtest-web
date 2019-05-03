FROM microsoft/dotnet:2.1-sdk AS build-stage
WORKDIR /SpeedTestWeb

COPY /SpeedTestWeb/SpeedTestWeb.csproj ./
RUN dotnet restore

COPY /SpeedTestWeb ./
RUN dotnet publish \
    --output ./PublishedApp \
    --configuration Release \
    --no-restore

FROM microsoft/dotnet:2.1-aspnetcore-runtime
LABEL repository="github.com/k8s-101/speedtest-api"
WORKDIR /SpeedTestWeb

COPY --from=build-stage /SpeedTestWeb/PublishedApp .
ENTRYPOINT ["dotnet", "SpeedTestWeb.dll"]
