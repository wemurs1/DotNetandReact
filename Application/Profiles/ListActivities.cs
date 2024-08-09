using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles;

public class ListActivities
{
    public class Query : IRequest<Result<List<UserActivityDto>?>>
    {
        public string? Predicate { get; set; }
        public string? Username { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>?>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<List<UserActivityDto>?>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = _context.ActivityAttendees.OrderBy(d => d.Activity!.Date)
                .Where(x => x.AppUser!.UserName == request.Username)
                .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

            switch (request.Predicate)
            {
                case "past":
                    query = query.Where(d => d.Date <= DateTime.UtcNow);
                    break;
                case "hosting":
                    query = query.Where(h => h.HostUsername == request.Username);
                    break;
                default:
                    query = query.Where(d => d.Date >= DateTime.UtcNow);
                    break;
            }

            return Result<List<UserActivityDto>>.Success(await query.ToListAsync());
        }
    }
}
