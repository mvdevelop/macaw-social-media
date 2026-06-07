-- ============================================
-- MACAW SOCIAL MEDIA - SEED DATA
-- Gerado em 2026-06-07T23:15:38.447Z
-- 100 usuários, 299 posts, 200 comentários
-- 400 likes, 1435 seguidores
-- ============================================

-- Limpa dados existentes (ordem inversa das FKs)
DELETE FROM public.likes;
DELETE FROM public.comments;
DELETE FROM public.shares;
DELETE FROM public.followers;
DELETE FROM public.follow_requests;
DELETE FROM public.notifications;
DELETE FROM public.stories;
DELETE FROM public.posts;
DELETE FROM public.users;

-- ========== USUÁRIOS ==========
INSERT INTO public.users (id, username, name, surname, avatar, cover, description, city, school, work, website, created_at) VALUES
  ('00000000-0000-4000-a000-000000000001', 'james_smith', 'James', 'Smith', 'https://i.pravatar.cc/200?u=user1@macaw.com', 'https://picsum.photos/seed/cover-1/1200/400', 'Building the future, one commit at a time. ☕', 'New York', 'MIT', 'Google', 'james_smith.dev', '2026-05-08T23:15:38.419Z'),
  ('00000000-0000-4000-a000-000000000002', 'mary_johnson', 'Mary', 'Johnson', 'https://i.pravatar.cc/200?u=user2@macaw.com', 'https://picsum.photos/seed/cover-2/1200/400', 'Full-stack developer by day, gamer by night. 🎮', 'Los Angeles', 'Stanford', 'Apple', 'mary_johnson.dev', '2026-05-07T23:15:38.421Z'),
  ('00000000-0000-4000-a000-000000000003', 'john_williams', 'John', 'Williams', 'https://i.pravatar.cc/200?u=user3@macaw.com', 'https://picsum.photos/seed/cover-3/1200/400', 'Turning coffee into code since 2018. 💻', 'Chicago', 'Harvard', 'Meta', 'john_williams.dev', '2026-05-06T23:15:38.421Z'),
  ('00000000-0000-4000-a000-000000000004', 'patricia_brown', 'Patricia', 'Brown', 'https://i.pravatar.cc/200?u=user4@macaw.com', 'https://picsum.photos/seed/cover-4/1200/400', 'Designing elegant solutions to complex problems. ✨', 'Houston', 'UC Berkeley', 'Microsoft', 'patricia_brown.dev', '2026-05-05T23:15:38.421Z'),
  ('00000000-0000-4000-a000-000000000005', 'robert_jones', 'Robert', 'Jones', 'https://i.pravatar.cc/200?u=user5@macaw.com', 'https://picsum.photos/seed/cover-5/1200/400', 'Life is short, make every line count. ⚡', 'Phoenix', 'UCLA', 'Amazon', 'robert_jones.dev', '2026-05-04T23:15:38.421Z'),
  ('00000000-0000-4000-a000-000000000006', 'jennifer_garcia', 'Jennifer', 'Garcia', 'https://i.pravatar.cc/200?u=user6@macaw.com', 'https://picsum.photos/seed/cover-6/1200/400', 'Exploring the intersection of tech and art. 🎨', 'Philadelphia', 'Columbia', 'Netflix', 'jennifer_garcia.dev', '2026-05-03T23:15:38.421Z'),
  ('00000000-0000-4000-a000-000000000007', 'michael_miller', 'Michael', 'Miller', 'https://i.pravatar.cc/200?u=user7@macaw.com', 'https://picsum.photos/seed/cover-7/1200/400', 'On a mission to make the web better. 🌐', 'San Antonio', 'Yale', 'Spotify', 'michael_miller.dev', '2026-05-02T23:15:38.421Z'),
  ('00000000-0000-4000-a000-000000000008', 'linda_davis', 'Linda', 'Davis', 'https://i.pravatar.cc/200?u=user8@macaw.com', 'https://picsum.photos/seed/cover-8/1200/400', 'Code is poetry in motion. 📝', 'San Diego', 'Princeton', 'Twitter', 'linda_davis.dev', '2026-05-01T23:15:38.421Z'),
  ('00000000-0000-4000-a000-000000000009', 'david_rodriguez', 'David', 'Rodriguez', 'https://i.pravatar.cc/200?u=user9@macaw.com', 'https://picsum.photos/seed/cover-9/1200/400', 'Building products that make a difference. 🚀', 'Dallas', 'Cornell', 'LinkedIn', 'david_rodriguez.dev', '2026-04-30T23:15:38.421Z'),
  ('00000000-0000-4000-a000-00000000000a', 'barbara_martinez', 'Barbara', 'Martinez', 'https://i.pravatar.cc/200?u=user10@macaw.com', 'https://picsum.photos/seed/cover-10/1200/400', 'Learning something new every day. 📚', 'Austin', 'NYU', 'Uber', 'barbara_martinez.dev', '2026-04-29T23:15:38.421Z'),
  ('00000000-0000-4000-a000-00000000000b', 'william_hernandez', 'William', 'Hernandez', 'https://i.pravatar.cc/200?u=user11@macaw.com', 'https://picsum.photos/seed/cover-11/1200/400', 'Software engineer with a passion for UX. 🎯', 'San Jose', 'University of Chicago', 'Airbnb', 'william_hernandez.dev', '2026-04-28T23:15:38.421Z'),
  ('00000000-0000-4000-a000-00000000000c', 'elizabeth_lopez', 'Elizabeth', 'Lopez', 'https://i.pravatar.cc/200?u=user12@macaw.com', 'https://picsum.photos/seed/cover-12/1200/400', 'Creating digital experiences that matter. 💡', 'Jacksonville', 'Duke', 'Dropbox', 'elizabeth_lopez.dev', '2026-04-27T23:15:38.421Z'),
  ('00000000-0000-4000-a000-00000000000d', 'richard_gonzalez', 'Richard', 'Gonzalez', 'https://i.pravatar.cc/200?u=user13@macaw.com', 'https://picsum.photos/seed/cover-13/1200/400', 'Tech enthusiast and lifelong learner. 🔬', 'Fort Worth', 'Northwestern', 'Stripe', 'richard_gonzalez.dev', '2026-04-26T23:15:38.421Z'),
  ('00000000-0000-4000-a000-00000000000e', 'susan_wilson', 'Susan', 'Wilson', 'https://i.pravatar.cc/200?u=user14@macaw.com', 'https://picsum.photos/seed/cover-14/1200/400', 'Simplifying complexity through code. 🧩', 'Columbus', 'USC', 'Shopify', 'susan_wilson.dev', '2026-04-25T23:15:38.421Z'),
  ('00000000-0000-4000-a000-00000000000f', 'joseph_anderson', 'Joseph', 'Anderson', 'https://i.pravatar.cc/200?u=user15@macaw.com', 'https://picsum.photos/seed/cover-15/1200/400', 'Engineer by trade, artist at heart. 🖌️', 'Charlotte', 'University of Michigan', 'Reddit', 'joseph_anderson.dev', '2026-04-24T23:15:38.421Z'),
  ('00000000-0000-4000-a000-000000000010', 'jessica_thomas', 'Jessica', 'Thomas', 'https://i.pravatar.cc/200?u=user16@macaw.com', 'https://picsum.photos/seed/cover-16/1200/400', 'Data-driven decision maker. 📊', 'Indianapolis', 'UC San Diego', 'Pinterest', 'jessica_thomas.dev', '2026-04-23T23:15:38.421Z'),
  ('00000000-0000-4000-a000-000000000011', 'thomas_taylor', 'Thomas', 'Taylor', 'https://i.pravatar.cc/200?u=user17@macaw.com', 'https://picsum.photos/seed/cover-17/1200/400', 'Open source contributor and community builder. 🤝', 'San Francisco', 'Carnegie Mellon', 'Snap', 'thomas_taylor.dev', '2026-04-22T23:15:38.421Z'),
  ('00000000-0000-4000-a000-000000000012', 'sarah_moore', 'Sarah', 'Moore', 'https://i.pravatar.cc/200?u=user18@macaw.com', 'https://picsum.photos/seed/cover-18/1200/400', 'Making the world a better place through technology. 🌍', 'Seattle', 'University of Texas', 'TikTok', 'sarah_moore.dev', '2026-04-21T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000013', 'christopher_jackson', 'Christopher', 'Jackson', 'https://i.pravatar.cc/200?u=user19@macaw.com', 'https://picsum.photos/seed/cover-19/1200/400', 'Code. Sleep. Repeat. 🔄', 'Denver', 'Georgia Tech', 'Nvidia', 'christopher_jackson.dev', '2026-04-20T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000014', 'karen_martin', 'Karen', 'Martin', 'https://i.pravatar.cc/200?u=user20@macaw.com', 'https://picsum.photos/seed/cover-20/1200/400', 'Passionate about performant web apps. ⚡', 'Nashville', 'University of Washington', 'Salesforce', 'karen_martin.dev', '2026-04-19T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000015', 'charles_lee', 'Charles', 'Lee', 'https://i.pravatar.cc/200?u=user21@macaw.com', 'https://picsum.photos/seed/cover-21/1200/400', 'Building the future, one commit at a time. ☕', 'Miami', 'University of Florida', 'Oracle', 'charles_lee.dev', '2026-04-18T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000016', 'lisa_perez', 'Lisa', 'Perez', 'https://i.pravatar.cc/200?u=user22@macaw.com', 'https://picsum.photos/seed/cover-22/1200/400', 'Full-stack developer by day, gamer by night. 🎮', 'Portland', 'University of Illinois', 'IBM', 'lisa_perez.dev', '2026-04-17T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000017', 'daniel_thompson', 'Daniel', 'Thompson', 'https://i.pravatar.cc/200?u=user23@macaw.com', 'https://picsum.photos/seed/cover-23/1200/400', 'Turning coffee into code since 2018. 💻', 'Oklahoma City', 'Purdue', 'Intel', 'daniel_thompson.dev', '2026-04-16T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000018', 'nancy_white', 'Nancy', 'White', 'https://i.pravatar.cc/200?u=user24@macaw.com', 'https://picsum.photos/seed/cover-24/1200/400', 'Designing elegant solutions to complex problems. ✨', 'Las Vegas', 'UMass', 'Cisco', 'nancy_white.dev', '2026-04-15T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000019', 'matthew_harris', 'Matthew', 'Harris', 'https://i.pravatar.cc/200?u=user25@macaw.com', 'https://picsum.photos/seed/cover-25/1200/400', 'Life is short, make every line count. ⚡', 'Louisville', 'Ohio State', 'Adobe', 'matthew_harris.dev', '2026-04-14T23:15:38.422Z');

INSERT INTO public.users (id, username, name, surname, avatar, cover, description, city, school, work, website, created_at) VALUES
  ('00000000-0000-4000-a000-00000000001a', 'betty_sanchez', 'Betty', 'Sanchez', 'https://i.pravatar.cc/200?u=user26@macaw.com', 'https://picsum.photos/seed/cover-26/1200/400', 'Exploring the intersection of tech and art. 🎨', 'Baltimore', 'Penn State', 'PayPal', 'betty_sanchez.dev', '2026-04-13T23:15:38.422Z'),
  ('00000000-0000-4000-a000-00000000001b', 'anthony_clark', 'Anthony', 'Clark', 'https://i.pravatar.cc/200?u=user27@macaw.com', 'https://picsum.photos/seed/cover-27/1200/400', 'On a mission to make the web better. 🌐', 'Milwaukee', 'Texas A&M', 'Square', 'anthony_clark.dev', '2026-04-12T23:15:38.422Z'),
  ('00000000-0000-4000-a000-00000000001c', 'margaret_ramirez', 'Margaret', 'Ramirez', 'https://i.pravatar.cc/200?u=user28@macaw.com', 'https://picsum.photos/seed/cover-28/1200/400', 'Code is poetry in motion. 📝', 'Albuquerque', 'Arizona State', 'Tesla', 'margaret_ramirez.dev', '2026-04-11T23:15:38.422Z'),
  ('00000000-0000-4000-a000-00000000001d', 'mark_lewis', 'Mark', 'Lewis', 'https://i.pravatar.cc/200?u=user29@macaw.com', 'https://picsum.photos/seed/cover-29/1200/400', 'Building products that make a difference. 🚀', 'Tucson', 'UC Davis', 'SpaceX', 'mark_lewis.dev', '2026-04-10T23:15:38.422Z'),
  ('00000000-0000-4000-a000-00000000001e', 'sandra_robinson', 'Sandra', 'Robinson', 'https://i.pravatar.cc/200?u=user30@macaw.com', 'https://picsum.photos/seed/cover-30/1200/400', 'Learning something new every day. 📚', 'Fresno', 'UC Irvine', 'Zoom', 'sandra_robinson.dev', '2026-04-09T23:15:38.422Z'),
  ('00000000-0000-4000-a000-00000000001f', 'donald_walker', 'Donald', 'Walker', 'https://i.pravatar.cc/200?u=user31@macaw.com', 'https://picsum.photos/seed/cover-31/1200/400', 'Software engineer with a passion for UX. 🎯', 'Mesa', 'University of Miami', 'Slack', 'donald_walker.dev', '2026-04-08T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000020', 'ashley_young', 'Ashley', 'Young', 'https://i.pravatar.cc/200?u=user32@macaw.com', 'https://picsum.photos/seed/cover-32/1200/400', 'Creating digital experiences that matter. 💡', 'Sacramento', 'Boston University', 'GitHub', 'ashley_young.dev', '2026-04-07T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000021', 'steven_allen', 'Steven', 'Allen', 'https://i.pravatar.cc/200?u=user33@macaw.com', 'https://picsum.photos/seed/cover-33/1200/400', 'Tech enthusiast and lifelong learner. 🔬', 'Atlanta', 'University of Oregon', 'Twilio', 'steven_allen.dev', '2026-04-06T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000022', 'kimberly_king', 'Kimberly', 'King', 'https://i.pravatar.cc/200?u=user34@macaw.com', 'https://picsum.photos/seed/cover-34/1200/400', 'Simplifying complexity through code. 🧩', 'Kansas City', 'University of Arizona', 'Atlassian', 'kimberly_king.dev', '2026-04-05T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000023', 'paul_wright', 'Paul', 'Wright', 'https://i.pravatar.cc/200?u=user35@macaw.com', 'https://picsum.photos/seed/cover-35/1200/400', 'Engineer by trade, artist at heart. 🖌️', 'Colorado Springs', 'UC Santa Barbara', 'Canva', 'paul_wright.dev', '2026-04-04T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000024', 'emily_scott', 'Emily', 'Scott', 'https://i.pravatar.cc/200?u=user36@macaw.com', 'https://picsum.photos/seed/cover-36/1200/400', 'Data-driven decision maker. 📊', 'Omaha', 'Michigan State', 'Figma', 'emily_scott.dev', '2026-04-03T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000025', 'andrew_torres', 'Andrew', 'Torres', 'https://i.pravatar.cc/200?u=user37@macaw.com', 'https://picsum.photos/seed/cover-37/1200/400', 'Open source contributor and community builder. 🤝', 'Raleigh', 'University of Colorado', 'Notion', 'andrew_torres.dev', '2026-04-02T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000026', 'donna_nguyen', 'Donna', 'Nguyen', 'https://i.pravatar.cc/200?u=user38@macaw.com', 'https://picsum.photos/seed/cover-38/1200/400', 'Making the world a better place through technology. 🌍', 'Long Beach', 'University of Georgia', 'Vercel', 'donna_nguyen.dev', '2026-04-01T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000027', 'joshua_hill', 'Joshua', 'Hill', 'https://i.pravatar.cc/200?u=user39@macaw.com', 'https://picsum.photos/seed/cover-39/1200/400', 'Code. Sleep. Repeat. 🔄', 'Virginia Beach', 'Florida State', 'Supabase', 'joshua_hill.dev', '2026-03-31T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000028', 'michelle_flores', 'Michelle', 'Flores', 'https://i.pravatar.cc/200?u=user40@macaw.com', 'https://picsum.photos/seed/cover-40/1200/400', 'Passionate about performant web apps. ⚡', 'Miami Beach', 'Clemson', 'Vercel', 'michelle_flores.dev', '2026-03-30T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000029', 'kenneth_green', 'Kenneth', 'Green', 'https://i.pravatar.cc/200?u=user41@macaw.com', 'https://picsum.photos/seed/cover-41/1200/400', 'Building the future, one commit at a time. ☕', 'Oakland', 'Indiana University', 'Google', 'kenneth_green.dev', '2026-03-29T23:15:38.422Z'),
  ('00000000-0000-4000-a000-00000000002a', 'carol_adams', 'Carol', 'Adams', 'https://i.pravatar.cc/200?u=user42@macaw.com', 'https://picsum.photos/seed/cover-42/1200/400', 'Full-stack developer by day, gamer by night. 🎮', 'Minneapolis', 'University of Utah', 'Apple', 'carol_adams.dev', '2026-03-28T23:15:38.422Z'),
  ('00000000-0000-4000-a000-00000000002b', 'kevin_nelson', 'Kevin', 'Nelson', 'https://i.pravatar.cc/200?u=user43@macaw.com', 'https://picsum.photos/seed/cover-43/1200/400', 'Turning coffee into code since 2018. 💻', 'Tampa', 'Rutgers', 'Meta', 'kevin_nelson.dev', '2026-03-27T23:15:38.422Z'),
  ('00000000-0000-4000-a000-00000000002c', 'amanda_baker', 'Amanda', 'Baker', 'https://i.pravatar.cc/200?u=user44@macaw.com', 'https://picsum.photos/seed/cover-44/1200/400', 'Designing elegant solutions to complex problems. ✨', 'Tulsa', 'University of Kansas', 'Microsoft', 'amanda_baker.dev', '2026-03-26T23:15:38.422Z'),
  ('00000000-0000-4000-a000-00000000002d', 'brian_hall', 'Brian', 'Hall', 'https://i.pravatar.cc/200?u=user45@macaw.com', 'https://picsum.photos/seed/cover-45/1200/400', 'Life is short, make every line count. ⚡', 'Arlington', 'Oregon State', 'Amazon', 'brian_hall.dev', '2026-03-25T23:15:38.422Z'),
  ('00000000-0000-4000-a000-00000000002e', 'dorothy_rivera', 'Dorothy', 'Rivera', 'https://i.pravatar.cc/200?u=user46@macaw.com', 'https://picsum.photos/seed/cover-46/1200/400', 'Exploring the intersection of tech and art. 🎨', 'New Orleans', 'SUNY Buffalo', 'Netflix', 'dorothy_rivera.dev', '2026-03-24T23:15:38.422Z'),
  ('00000000-0000-4000-a000-00000000002f', 'george_campbell', 'George', 'Campbell', 'https://i.pravatar.cc/200?u=user47@macaw.com', 'https://picsum.photos/seed/cover-47/1200/400', 'On a mission to make the web better. 🌐', 'Cleveland', 'University of New Mexico', 'Spotify', 'george_campbell.dev', '2026-03-23T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000030', 'melissa_mitchell', 'Melissa', 'Mitchell', 'https://i.pravatar.cc/200?u=user48@macaw.com', 'https://picsum.photos/seed/cover-48/1200/400', 'Code is poetry in motion. 📝', 'Bakersfield', 'Virginia Tech', 'Twitter', 'melissa_mitchell.dev', '2026-03-22T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000031', 'timothy_carter', 'Timothy', 'Carter', 'https://i.pravatar.cc/200?u=user49@macaw.com', 'https://picsum.photos/seed/cover-49/1200/400', 'Building products that make a difference. 🚀', 'Honolulu', 'Tulane', 'LinkedIn', 'timothy_carter.dev', '2026-03-21T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000032', 'deborah_roberts', 'Deborah', 'Roberts', 'https://i.pravatar.cc/200?u=user50@macaw.com', 'https://picsum.photos/seed/cover-50/1200/400', 'Learning something new every day. 📚', 'Anaheim', 'RPI', 'Uber', 'deborah_roberts.dev', '2026-03-20T23:15:38.422Z');

INSERT INTO public.users (id, username, name, surname, avatar, cover, description, city, school, work, website, created_at) VALUES
  ('00000000-0000-4000-a000-000000000033', 'ronald_gomez', 'Ronald', 'Gomez', 'https://i.pravatar.cc/200?u=user51@macaw.com', 'https://picsum.photos/seed/cover-51/1200/400', 'Software engineer with a passion for UX. 🎯', 'New York', 'MIT', 'Airbnb', 'ronald_gomez.dev', '2026-03-19T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000034', 'stephanie_phillips', 'Stephanie', 'Phillips', 'https://i.pravatar.cc/200?u=user52@macaw.com', 'https://picsum.photos/seed/cover-52/1200/400', 'Creating digital experiences that matter. 💡', 'Los Angeles', 'Stanford', 'Dropbox', 'stephanie_phillips.dev', '2026-03-18T23:15:38.422Z'),
  ('00000000-0000-4000-a000-000000000035', 'edward_evans', 'Edward', 'Evans', 'https://i.pravatar.cc/200?u=user53@macaw.com', 'https://picsum.photos/seed/cover-53/1200/400', 'Tech enthusiast and lifelong learner. 🔬', 'Chicago', 'Harvard', 'Stripe', 'edward_evans.dev', '2026-03-17T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000036', 'rebecca_turner', 'Rebecca', 'Turner', 'https://i.pravatar.cc/200?u=user54@macaw.com', 'https://picsum.photos/seed/cover-54/1200/400', 'Simplifying complexity through code. 🧩', 'Houston', 'UC Berkeley', 'Shopify', 'rebecca_turner.dev', '2026-03-16T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000037', 'jason_diaz', 'Jason', 'Diaz', 'https://i.pravatar.cc/200?u=user55@macaw.com', 'https://picsum.photos/seed/cover-55/1200/400', 'Engineer by trade, artist at heart. 🖌️', 'Phoenix', 'UCLA', 'Reddit', 'jason_diaz.dev', '2026-03-15T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000038', 'sharon_parker', 'Sharon', 'Parker', 'https://i.pravatar.cc/200?u=user56@macaw.com', 'https://picsum.photos/seed/cover-56/1200/400', 'Data-driven decision maker. 📊', 'Philadelphia', 'Columbia', 'Pinterest', 'sharon_parker.dev', '2026-03-14T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000039', 'jeffrey_cruz', 'Jeffrey', 'Cruz', 'https://i.pravatar.cc/200?u=user57@macaw.com', 'https://picsum.photos/seed/cover-57/1200/400', 'Open source contributor and community builder. 🤝', 'San Antonio', 'Yale', 'Snap', 'jeffrey_cruz.dev', '2026-03-13T23:15:38.423Z'),
  ('00000000-0000-4000-a000-00000000003a', 'laura_edwards', 'Laura', 'Edwards', 'https://i.pravatar.cc/200?u=user58@macaw.com', 'https://picsum.photos/seed/cover-58/1200/400', 'Making the world a better place through technology. 🌍', 'San Diego', 'Princeton', 'TikTok', 'laura_edwards.dev', '2026-03-12T23:15:38.423Z'),
  ('00000000-0000-4000-a000-00000000003b', 'ryan_collins', 'Ryan', 'Collins', 'https://i.pravatar.cc/200?u=user59@macaw.com', 'https://picsum.photos/seed/cover-59/1200/400', 'Code. Sleep. Repeat. 🔄', 'Dallas', 'Cornell', 'Nvidia', 'ryan_collins.dev', '2026-03-11T23:15:38.423Z'),
  ('00000000-0000-4000-a000-00000000003c', 'cynthia_reyes', 'Cynthia', 'Reyes', 'https://i.pravatar.cc/200?u=user60@macaw.com', 'https://picsum.photos/seed/cover-60/1200/400', 'Passionate about performant web apps. ⚡', 'Austin', 'NYU', 'Salesforce', 'cynthia_reyes.dev', '2026-03-10T23:15:38.423Z'),
  ('00000000-0000-4000-a000-00000000003d', 'jacob_stewart', 'Jacob', 'Stewart', 'https://i.pravatar.cc/200?u=user61@macaw.com', 'https://picsum.photos/seed/cover-61/1200/400', 'Building the future, one commit at a time. ☕', 'San Jose', 'University of Chicago', 'Oracle', 'jacob_stewart.dev', '2026-03-09T23:15:38.423Z'),
  ('00000000-0000-4000-a000-00000000003e', 'kathleen_morris', 'Kathleen', 'Morris', 'https://i.pravatar.cc/200?u=user62@macaw.com', 'https://picsum.photos/seed/cover-62/1200/400', 'Full-stack developer by day, gamer by night. 🎮', 'Jacksonville', 'Duke', 'IBM', 'kathleen_morris.dev', '2026-03-08T23:15:38.423Z'),
  ('00000000-0000-4000-a000-00000000003f', 'gary_morales', 'Gary', 'Morales', 'https://i.pravatar.cc/200?u=user63@macaw.com', 'https://picsum.photos/seed/cover-63/1200/400', 'Turning coffee into code since 2018. 💻', 'Fort Worth', 'Northwestern', 'Intel', 'gary_morales.dev', '2026-03-07T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000040', 'amy_murphy', 'Amy', 'Murphy', 'https://i.pravatar.cc/200?u=user64@macaw.com', 'https://picsum.photos/seed/cover-64/1200/400', 'Designing elegant solutions to complex problems. ✨', 'Columbus', 'USC', 'Cisco', 'amy_murphy.dev', '2026-03-06T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000041', 'nicholas_cook', 'Nicholas', 'Cook', 'https://i.pravatar.cc/200?u=user65@macaw.com', 'https://picsum.photos/seed/cover-65/1200/400', 'Life is short, make every line count. ⚡', 'Charlotte', 'University of Michigan', 'Adobe', 'nicholas_cook.dev', '2026-03-05T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000042', 'angela_rogers', 'Angela', 'Rogers', 'https://i.pravatar.cc/200?u=user66@macaw.com', 'https://picsum.photos/seed/cover-66/1200/400', 'Exploring the intersection of tech and art. 🎨', 'Indianapolis', 'UC San Diego', 'PayPal', 'angela_rogers.dev', '2026-03-04T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000043', 'eric_gutierrez', 'Eric', 'Gutierrez', 'https://i.pravatar.cc/200?u=user67@macaw.com', 'https://picsum.photos/seed/cover-67/1200/400', 'On a mission to make the web better. 🌐', 'San Francisco', 'Carnegie Mellon', 'Square', 'eric_gutierrez.dev', '2026-03-03T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000044', 'shirley_ortiz', 'Shirley', 'Ortiz', 'https://i.pravatar.cc/200?u=user68@macaw.com', 'https://picsum.photos/seed/cover-68/1200/400', 'Code is poetry in motion. 📝', 'Seattle', 'University of Texas', 'Tesla', 'shirley_ortiz.dev', '2026-03-02T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000045', 'jonathan_morgan', 'Jonathan', 'Morgan', 'https://i.pravatar.cc/200?u=user69@macaw.com', 'https://picsum.photos/seed/cover-69/1200/400', 'Building products that make a difference. 🚀', 'Denver', 'Georgia Tech', 'SpaceX', 'jonathan_morgan.dev', '2026-03-01T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000046', 'anna_cooper', 'Anna', 'Cooper', 'https://i.pravatar.cc/200?u=user70@macaw.com', 'https://picsum.photos/seed/cover-70/1200/400', 'Learning something new every day. 📚', 'Nashville', 'University of Washington', 'Zoom', 'anna_cooper.dev', '2026-02-28T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000047', 'stephen_peterson', 'Stephen', 'Peterson', 'https://i.pravatar.cc/200?u=user71@macaw.com', 'https://picsum.photos/seed/cover-71/1200/400', 'Software engineer with a passion for UX. 🎯', 'Miami', 'University of Florida', 'Slack', 'stephen_peterson.dev', '2026-02-27T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000048', 'brenda_bailey', 'Brenda', 'Bailey', 'https://i.pravatar.cc/200?u=user72@macaw.com', 'https://picsum.photos/seed/cover-72/1200/400', 'Creating digital experiences that matter. 💡', 'Portland', 'University of Illinois', 'GitHub', 'brenda_bailey.dev', '2026-02-26T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000049', 'larry_reed', 'Larry', 'Reed', 'https://i.pravatar.cc/200?u=user73@macaw.com', 'https://picsum.photos/seed/cover-73/1200/400', 'Tech enthusiast and lifelong learner. 🔬', 'Oklahoma City', 'Purdue', 'Twilio', 'larry_reed.dev', '2026-02-25T23:15:38.423Z'),
  ('00000000-0000-4000-a000-00000000004a', 'pamela_kelly', 'Pamela', 'Kelly', 'https://i.pravatar.cc/200?u=user74@macaw.com', 'https://picsum.photos/seed/cover-74/1200/400', 'Simplifying complexity through code. 🧩', 'Las Vegas', 'UMass', 'Atlassian', 'pamela_kelly.dev', '2026-02-24T23:15:38.423Z'),
  ('00000000-0000-4000-a000-00000000004b', 'justin_howard', 'Justin', 'Howard', 'https://i.pravatar.cc/200?u=user75@macaw.com', 'https://picsum.photos/seed/cover-75/1200/400', 'Engineer by trade, artist at heart. 🖌️', 'Louisville', 'Ohio State', 'Canva', 'justin_howard.dev', '2026-02-23T23:15:38.423Z');

INSERT INTO public.users (id, username, name, surname, avatar, cover, description, city, school, work, website, created_at) VALUES
  ('00000000-0000-4000-a000-00000000004c', 'emma_ramos', 'Emma', 'Ramos', 'https://i.pravatar.cc/200?u=user76@macaw.com', 'https://picsum.photos/seed/cover-76/1200/400', 'Data-driven decision maker. 📊', 'Baltimore', 'Penn State', 'Figma', 'emma_ramos.dev', '2026-02-22T23:15:38.423Z'),
  ('00000000-0000-4000-a000-00000000004d', 'scott_kim', 'Scott', 'Kim', 'https://i.pravatar.cc/200?u=user77@macaw.com', 'https://picsum.photos/seed/cover-77/1200/400', 'Open source contributor and community builder. 🤝', 'Milwaukee', 'Texas A&M', 'Notion', 'scott_kim.dev', '2026-02-21T23:15:38.423Z'),
  ('00000000-0000-4000-a000-00000000004e', 'nicole_cox', 'Nicole', 'Cox', 'https://i.pravatar.cc/200?u=user78@macaw.com', 'https://picsum.photos/seed/cover-78/1200/400', 'Making the world a better place through technology. 🌍', 'Albuquerque', 'Arizona State', 'Vercel', 'nicole_cox.dev', '2026-02-20T23:15:38.423Z'),
  ('00000000-0000-4000-a000-00000000004f', 'brandon_ward', 'Brandon', 'Ward', 'https://i.pravatar.cc/200?u=user79@macaw.com', 'https://picsum.photos/seed/cover-79/1200/400', 'Code. Sleep. Repeat. 🔄', 'Tucson', 'UC Davis', 'Supabase', 'brandon_ward.dev', '2026-02-19T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000050', 'helen_richardson', 'Helen', 'Richardson', 'https://i.pravatar.cc/200?u=user80@macaw.com', 'https://picsum.photos/seed/cover-80/1200/400', 'Passionate about performant web apps. ⚡', 'Fresno', 'UC Irvine', 'Vercel', 'helen_richardson.dev', '2026-02-18T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000051', 'frank_watson', 'Frank', 'Watson', 'https://i.pravatar.cc/200?u=user81@macaw.com', 'https://picsum.photos/seed/cover-81/1200/400', 'Building the future, one commit at a time. ☕', 'Mesa', 'University of Miami', 'Google', 'frank_watson.dev', '2026-02-17T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000052', 'samantha_brooks', 'Samantha', 'Brooks', 'https://i.pravatar.cc/200?u=user82@macaw.com', 'https://picsum.photos/seed/cover-82/1200/400', 'Full-stack developer by day, gamer by night. 🎮', 'Sacramento', 'Boston University', 'Apple', 'samantha_brooks.dev', '2026-02-16T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000053', 'raymond_chavez', 'Raymond', 'Chavez', 'https://i.pravatar.cc/200?u=user83@macaw.com', 'https://picsum.photos/seed/cover-83/1200/400', 'Turning coffee into code since 2018. 💻', 'Atlanta', 'University of Oregon', 'Meta', 'raymond_chavez.dev', '2026-02-15T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000054', 'katherine_wood', 'Katherine', 'Wood', 'https://i.pravatar.cc/200?u=user84@macaw.com', 'https://picsum.photos/seed/cover-84/1200/400', 'Designing elegant solutions to complex problems. ✨', 'Kansas City', 'University of Arizona', 'Microsoft', 'katherine_wood.dev', '2026-02-14T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000055', 'gregory_james', 'Gregory', 'James', 'https://i.pravatar.cc/200?u=user85@macaw.com', 'https://picsum.photos/seed/cover-85/1200/400', 'Life is short, make every line count. ⚡', 'Colorado Springs', 'UC Santa Barbara', 'Amazon', 'gregory_james.dev', '2026-02-13T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000056', 'christine_bennett', 'Christine', 'Bennett', 'https://i.pravatar.cc/200?u=user86@macaw.com', 'https://picsum.photos/seed/cover-86/1200/400', 'Exploring the intersection of tech and art. 🎨', 'Omaha', 'Michigan State', 'Netflix', 'christine_bennett.dev', '2026-02-12T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000057', 'joshua_gray', 'Joshua', 'Gray', 'https://i.pravatar.cc/200?u=user87@macaw.com', 'https://picsum.photos/seed/cover-87/1200/400', 'On a mission to make the web better. 🌐', 'Raleigh', 'University of Colorado', 'Spotify', 'joshua_gray.dev', '2026-02-11T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000058', 'debra_mendoza', 'Debra', 'Mendoza', 'https://i.pravatar.cc/200?u=user88@macaw.com', 'https://picsum.photos/seed/cover-88/1200/400', 'Code is poetry in motion. 📝', 'Long Beach', 'University of Georgia', 'Twitter', 'debra_mendoza.dev', '2026-02-10T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000059', 'jerry_ruiz', 'Jerry', 'Ruiz', 'https://i.pravatar.cc/200?u=user89@macaw.com', 'https://picsum.photos/seed/cover-89/1200/400', 'Building products that make a difference. 🚀', 'Virginia Beach', 'Florida State', 'LinkedIn', 'jerry_ruiz.dev', '2026-02-09T23:15:38.423Z'),
  ('00000000-0000-4000-a000-00000000005a', 'rachel_hughes', 'Rachel', 'Hughes', 'https://i.pravatar.cc/200?u=user90@macaw.com', 'https://picsum.photos/seed/cover-90/1200/400', 'Learning something new every day. 📚', 'Miami Beach', 'Clemson', 'Uber', 'rachel_hughes.dev', '2026-02-08T23:15:38.423Z'),
  ('00000000-0000-4000-a000-00000000005b', 'dennis_price', 'Dennis', 'Price', 'https://i.pravatar.cc/200?u=user91@macaw.com', 'https://picsum.photos/seed/cover-91/1200/400', 'Software engineer with a passion for UX. 🎯', 'Oakland', 'Indiana University', 'Airbnb', 'dennis_price.dev', '2026-02-07T23:15:38.423Z'),
  ('00000000-0000-4000-a000-00000000005c', 'carolyn_alvarez', 'Carolyn', 'Alvarez', 'https://i.pravatar.cc/200?u=user92@macaw.com', 'https://picsum.photos/seed/cover-92/1200/400', 'Creating digital experiences that matter. 💡', 'Minneapolis', 'University of Utah', 'Dropbox', 'carolyn_alvarez.dev', '2026-02-06T23:15:38.423Z'),
  ('00000000-0000-4000-a000-00000000005d', 'walter_castillo', 'Walter', 'Castillo', 'https://i.pravatar.cc/200?u=user93@macaw.com', 'https://picsum.photos/seed/cover-93/1200/400', 'Tech enthusiast and lifelong learner. 🔬', 'Tampa', 'Rutgers', 'Stripe', 'walter_castillo.dev', '2026-02-05T23:15:38.423Z'),
  ('00000000-0000-4000-a000-00000000005e', 'janet_sanders', 'Janet', 'Sanders', 'https://i.pravatar.cc/200?u=user94@macaw.com', 'https://picsum.photos/seed/cover-94/1200/400', 'Simplifying complexity through code. 🧩', 'Tulsa', 'University of Kansas', 'Shopify', 'janet_sanders.dev', '2026-02-04T23:15:38.423Z'),
  ('00000000-0000-4000-a000-00000000005f', 'patrick_patel', 'Patrick', 'Patel', 'https://i.pravatar.cc/200?u=user95@macaw.com', 'https://picsum.photos/seed/cover-95/1200/400', 'Engineer by trade, artist at heart. 🖌️', 'Arlington', 'Oregon State', 'Reddit', 'patrick_patel.dev', '2026-02-03T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000060', 'catherine_myers', 'Catherine', 'Myers', 'https://i.pravatar.cc/200?u=user96@macaw.com', 'https://picsum.photos/seed/cover-96/1200/400', 'Data-driven decision maker. 📊', 'New Orleans', 'SUNY Buffalo', 'Pinterest', 'catherine_myers.dev', '2026-02-02T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000061', 'harold_long', 'Harold', 'Long', 'https://i.pravatar.cc/200?u=user97@macaw.com', 'https://picsum.photos/seed/cover-97/1200/400', 'Open source contributor and community builder. 🤝', 'Cleveland', 'University of New Mexico', 'Snap', 'harold_long.dev', '2026-02-01T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000062', 'maria_ross', 'Maria', 'Ross', 'https://i.pravatar.cc/200?u=user98@macaw.com', 'https://picsum.photos/seed/cover-98/1200/400', 'Making the world a better place through technology. 🌍', 'Bakersfield', 'Virginia Tech', 'TikTok', 'maria_ross.dev', '2026-01-31T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000063', 'douglas_foster', 'Douglas', 'Foster', 'https://i.pravatar.cc/200?u=user99@macaw.com', 'https://picsum.photos/seed/cover-99/1200/400', 'Code. Sleep. Repeat. 🔄', 'Honolulu', 'Tulane', 'Nvidia', 'douglas_foster.dev', '2026-01-30T23:15:38.423Z'),
  ('00000000-0000-4000-a000-000000000064', 'heather_jimenez', 'Heather', 'Jimenez', 'https://i.pravatar.cc/200?u=user100@macaw.com', 'https://picsum.photos/seed/cover-100/1200/400', 'Passionate about performant web apps. ⚡', 'Anaheim', 'RPI', 'Salesforce', 'heather_jimenez.dev', '2026-01-29T23:15:38.423Z');

-- ========== POSTS ==========
INSERT INTO public.posts (id, content, img, created_at, user_id) VALUES
  (1, 'Just launched a new feature! After weeks of hard work, it''s finally live. The team did an amazing job. Check it out and let me know what you think! 🚀

#TypeScript #React #Node.js', NULL, '2026-06-07T21:15:38.421Z', '00000000-0000-4000-a000-000000000001'),
  (2, 'Finally optimized our database queries. From 5 seconds to 50 milliseconds. Sometimes the simple fixes make the biggest difference. ⚡

#Python #FastAPI #PostgreSQL', 'https://picsum.photos/seed/post-1-1/600/400', '2026-06-07T20:15:38.421Z', '00000000-0000-4000-a000-000000000001'),
  (3, 'Beautiful sunset from the office rooftop today. Sometimes you just need to pause and appreciate the view. 🌅

#Python #FastAPI #PostgreSQL', 'https://picsum.photos/seed/post-2-0/600/400', '2026-06-07T19:15:38.421Z', '00000000-0000-4000-a000-000000000002'),
  (4, 'Throwback to my first hackathon. We built a social media app in 48 hours. Look at us now! 🏆

#Rust #WebAssembly #JavaScript', 'https://picsum.photos/seed/post-2-1/600/400', '2026-06-07T18:15:38.421Z', '00000000-0000-4000-a000-000000000002'),
  (5, 'Just gave a talk at a local meetup about microservices architecture. The Q&A session was incredible! 🎤

#Go #Docker #Kubernetes', NULL, '2026-06-07T17:15:38.421Z', '00000000-0000-4000-a000-000000000002'),
  (6, 'Hot take: TypeScript is the best thing that happened to JavaScript. Fight me. 🔥

#Rust #WebAssembly #JavaScript', 'https://picsum.photos/seed/post-3-0/600/400', '2026-06-07T16:15:38.421Z', '00000000-0000-4000-a000-000000000003'),
  (7, 'Great team meeting today. Love working with people who challenge me to be better. 🤝

#Go #Docker #Kubernetes', NULL, '2026-06-07T15:15:38.421Z', '00000000-0000-4000-a000-000000000003'),
  (8, 'Happy Monday! Starting the week with a fresh perspective and a todo list that''s actually realistic. 📋

#React #Next.js #Tailwind', 'https://picsum.photos/seed/post-3-2/600/400', '2026-06-07T14:15:38.421Z', '00000000-0000-4000-a000-000000000003'),
  (9, 'Late night coding session with lofi beats in the background. This is my happy place. 🎧

#Vue.js #Nuxt #TypeScript', 'https://picsum.photos/seed/post-3-3/600/400', '2026-06-07T13:15:38.421Z', '00000000-0000-4000-a000-000000000003'),
  (10, 'Spent the weekend hiking in the mountains. No reception, no emails, just pure nature. Highly recommend! 🏔️

#Go #Docker #Kubernetes', NULL, '2026-06-07T12:15:38.421Z', '00000000-0000-4000-a000-000000000004'),
  (11, 'Just discovered a new framework and I''m obsessed. This is why I love this industry - there''s always something new to learn! 🔥

#React #Next.js #Tailwind', 'https://picsum.photos/seed/post-4-1/600/400', '2026-06-07T11:15:38.421Z', '00000000-0000-4000-a000-000000000004'),
  (12, 'Just finished reading ''Atomic Habits'' by James Clear. Game changer for productivity! 📚

#React #Next.js #Tailwind', 'https://picsum.photos/seed/post-5-0/600/400', '2026-06-07T10:15:38.421Z', '00000000-0000-4000-a000-000000000005'),
  (13, 'Weekend vibes. Grilling some burgers and enjoying the weather. Life is good. 🍔☀️

#Vue.js #Nuxt #TypeScript', 'https://picsum.photos/seed/post-5-1/600/400', '2026-06-07T09:15:38.421Z', '00000000-0000-4000-a000-000000000005'),
  (14, 'Nothing beats the feeling of deploying on a Friday and watching those green checkmarks roll in. ✅

#Swift #iOS #Xcode', NULL, '2026-06-07T08:15:38.421Z', '00000000-0000-4000-a000-000000000005'),
  (15, 'New blog post is up! I wrote about my journey from junior to senior developer and the lessons I learned along the way. Link in bio! ✍️

#Vue.js #Nuxt #TypeScript', 'https://picsum.photos/seed/post-6-0/600/400', '2026-06-07T07:15:38.421Z', '00000000-0000-4000-a000-000000000006'),
  (16, 'Proud moment: my PR just got merged into a major open source project! 🎉

#Swift #iOS #Xcode', NULL, '2026-06-07T06:15:38.421Z', '00000000-0000-4000-a000-000000000006'),
  (17, 'Attended an amazing conference today. So inspired by all the innovative projects people are building. 🌟

#Kotlin #Android #Firebase', 'https://picsum.photos/seed/post-6-2/600/400', '2026-06-07T05:15:38.421Z', '00000000-0000-4000-a000-000000000006'),
  (18, 'Our team just won the internal hackathon! 48 hours of intense coding, minimal sleep, maximum fun. 🏅

#C# #.NET #Azure', 'https://picsum.photos/seed/post-6-3/600/400', '2026-06-07T04:15:38.421Z', '00000000-0000-4000-a000-000000000006'),
  (19, 'Coffee and code. Name a better duo. I''ll wait. ☕💻

#Swift #iOS #Xcode', NULL, '2026-06-07T03:15:38.421Z', '00000000-0000-4000-a000-000000000007'),
  (20, 'Does anyone else refactor code at 2 AM just because you can''t sleep thinking about a better solution? 😅

#Kotlin #Android #Firebase', 'https://picsum.photos/seed/post-7-1/600/400', '2026-06-07T02:15:38.421Z', '00000000-0000-4000-a000-000000000007'),
  (21, 'Finally optimized our database queries. From 5 seconds to 50 milliseconds. Sometimes the simple fixes make the biggest difference. ⚡

#Kotlin #Android #Firebase', 'https://picsum.photos/seed/post-8-0/600/400', '2026-06-07T01:15:38.421Z', '00000000-0000-4000-a000-000000000008'),
  (22, 'New desk setup is complete! Dual monitors, mechanical keyboard, and way too many plants. 🌿

#C# #.NET #Azure', 'https://picsum.photos/seed/post-8-1/600/400', '2026-06-07T00:15:38.421Z', '00000000-0000-4000-a000-000000000008'),
  (23, 'Finally understanding Rust''s borrow checker. It only took me 3 months. 😤

#Java #Spring #AWS', NULL, '2026-06-06T23:15:38.421Z', '00000000-0000-4000-a000-000000000008'),
  (24, 'Throwback to my first hackathon. We built a social media app in 48 hours. Look at us now! 🏆

#C# #.NET #Azure', 'https://picsum.photos/seed/post-9-0/600/400', '2026-06-06T22:15:38.421Z', '00000000-0000-4000-a000-000000000009'),
  (25, 'Just gave a talk at a local meetup about microservices architecture. The Q&A session was incredible! 🎤

#Java #Spring #AWS', NULL, '2026-06-06T21:15:38.421Z', '00000000-0000-4000-a000-000000000009');

INSERT INTO public.posts (id, content, img, created_at, user_id) VALUES
  (26, 'Shoutout to my mentor who taught me that clean code is not about perfection, it''s about empathy for the next developer. 🙏

#TypeScript #GraphQL #Prisma', 'https://picsum.photos/seed/post-9-2/600/400', '2026-06-06T20:15:38.421Z', '00000000-0000-4000-a000-000000000009'),
  (27, 'Just wrapped up a massive refactor. The codebase feels 10 years younger. Clean architecture is worth the investment. 🏗️

#React #React Native #Expo', 'https://picsum.photos/seed/post-9-3/600/400', '2026-06-06T19:15:38.421Z', '00000000-0000-4000-a000-000000000009'),
  (28, 'Great team meeting today. Love working with people who challenge me to be better. 🤝

#Java #Spring #AWS', NULL, '2026-06-06T18:15:38.421Z', '00000000-0000-4000-a000-00000000000a'),
  (29, 'Happy Monday! Starting the week with a fresh perspective and a todo list that''s actually realistic. 📋

#TypeScript #GraphQL #Prisma', 'https://picsum.photos/seed/post-10-1/600/400', '2026-06-06T17:15:38.421Z', '00000000-0000-4000-a000-00000000000a'),
  (30, 'Just discovered a new framework and I''m obsessed. This is why I love this industry - there''s always something new to learn! 🔥

#TypeScript #GraphQL #Prisma', 'https://picsum.photos/seed/post-11-0/600/400', '2026-06-06T16:15:38.421Z', '00000000-0000-4000-a000-00000000000b'),
  (31, 'Migration from REST to GraphQL went smoother than expected. 6 hours of work, zero downtime. 💪

#React #React Native #Expo', 'https://picsum.photos/seed/post-11-1/600/400', '2026-06-06T15:15:38.421Z', '00000000-0000-4000-a000-00000000000b'),
  (32, 'Just automated a task that used to take me 2 hours every day. That''s 40 hours a month back. 🤯

#Svelte #SvelteKit #Vite', NULL, '2026-06-06T14:15:38.421Z', '00000000-0000-4000-a000-00000000000b'),
  (33, 'Weekend vibes. Grilling some burgers and enjoying the weather. Life is good. 🍔☀️

#React #React Native #Expo', 'https://picsum.photos/seed/post-12-0/600/400', '2026-06-06T13:15:38.421Z', '00000000-0000-4000-a000-00000000000c'),
  (34, 'Nothing beats the feeling of deploying on a Friday and watching those green checkmarks roll in. ✅

#Svelte #SvelteKit #Vite', NULL, '2026-06-06T12:15:38.421Z', '00000000-0000-4000-a000-00000000000c'),
  (35, 'Contemplating life choices while debugging a production issue at 11 PM. Send help. 😂

#Solid.js #TypeScript #Vite', 'https://picsum.photos/seed/post-12-2/600/400', '2026-06-06T11:15:38.421Z', '00000000-0000-4000-a000-00000000000c'),
  (36, 'Nothing like the feeling of solving a bug that''s been haunting you for days. Victory dance! 💃

#Next.js #Supabase #Tailwind', 'https://picsum.photos/seed/post-12-3/600/400', '2026-06-06T10:15:38.421Z', '00000000-0000-4000-a000-00000000000c'),
  (37, 'Proud moment: my PR just got merged into a major open source project! 🎉

#Svelte #SvelteKit #Vite', NULL, '2026-06-06T09:15:38.421Z', '00000000-0000-4000-a000-00000000000d'),
  (38, 'Attended an amazing conference today. So inspired by all the innovative projects people are building. 🌟

#Solid.js #TypeScript #Vite', 'https://picsum.photos/seed/post-13-1/600/400', '2026-06-06T08:15:38.421Z', '00000000-0000-4000-a000-00000000000d'),
  (39, 'Does anyone else refactor code at 2 AM just because you can''t sleep thinking about a better solution? 😅

#Solid.js #TypeScript #Vite', 'https://picsum.photos/seed/post-14-0/600/400', '2026-06-06T07:15:38.421Z', '00000000-0000-4000-a000-00000000000e'),
  (40, 'The new MacBook Pro is incredible. The battery life alone is worth the upgrade. 💻

#Next.js #Supabase #Tailwind', 'https://picsum.photos/seed/post-14-1/600/400', '2026-06-06T06:15:38.421Z', '00000000-0000-4000-a000-00000000000e'),
  (41, 'Built a CLI tool today that saves 5 minutes per developer per day. Small wins add up! 🛠️

#Python #Django #PostgreSQL', NULL, '2026-06-06T05:15:38.421Z', '00000000-0000-4000-a000-00000000000e'),
  (42, 'New desk setup is complete! Dual monitors, mechanical keyboard, and way too many plants. 🌿

#Next.js #Supabase #Tailwind', 'https://picsum.photos/seed/post-15-0/600/400', '2026-06-06T04:15:38.421Z', '00000000-0000-4000-a000-00000000000f'),
  (43, 'Finally understanding Rust''s borrow checker. It only took me 3 months. 😤

#Python #Django #PostgreSQL', NULL, '2026-06-06T03:15:38.421Z', '00000000-0000-4000-a000-00000000000f'),
  (44, 'Imposter syndrome is real, but remember: you got hired for a reason. You belong here. 💪

#PHP #Laravel #MySQL', 'https://picsum.photos/seed/post-15-2/600/400', '2026-06-06T02:15:38.421Z', '00000000-0000-4000-a000-00000000000f'),
  (45, '5 years ago I wrote my first line of code. Today I lead a team of 10 engineers. Time flies! 🚀

#Ruby #Rails #Heroku', 'https://picsum.photos/seed/post-15-3/600/400', '2026-06-06T01:15:38.421Z', '00000000-0000-4000-a000-00000000000f'),
  (46, 'Just gave a talk at a local meetup about microservices architecture. The Q&A session was incredible! 🎤

#Python #Django #PostgreSQL', NULL, '2026-06-06T00:15:38.421Z', '00000000-0000-4000-a000-000000000010'),
  (47, 'Shoutout to my mentor who taught me that clean code is not about perfection, it''s about empathy for the next developer. 🙏

#PHP #Laravel #MySQL', 'https://picsum.photos/seed/post-16-1/600/400', '2026-06-05T23:15:38.421Z', '00000000-0000-4000-a000-000000000010'),
  (48, 'Happy Monday! Starting the week with a fresh perspective and a todo list that''s actually realistic. 📋

#PHP #Laravel #MySQL', 'https://picsum.photos/seed/post-17-0/600/400', '2026-06-05T22:15:38.422Z', '00000000-0000-4000-a000-000000000011'),
  (49, 'Late night coding session with lofi beats in the background. This is my happy place. 🎧

#Ruby #Rails #Heroku', 'https://picsum.photos/seed/post-17-1/600/400', '2026-06-05T21:15:38.422Z', '00000000-0000-4000-a000-000000000011'),
  (50, 'Trying out a new productivity technique: 25 minutes of focused work, 5 minute breaks. So far so good! ⏱️

#Elixir #Phoenix #PostgreSQL', NULL, '2026-06-05T20:15:38.422Z', '00000000-0000-4000-a000-000000000011');

INSERT INTO public.posts (id, content, img, created_at, user_id) VALUES
  (51, 'Migration from REST to GraphQL went smoother than expected. 6 hours of work, zero downtime. 💪

#Ruby #Rails #Heroku', 'https://picsum.photos/seed/post-18-0/600/400', '2026-06-05T19:15:38.422Z', '00000000-0000-4000-a000-000000000012'),
  (52, 'Just automated a task that used to take me 2 hours every day. That''s 40 hours a month back. 🤯

#Elixir #Phoenix #PostgreSQL', NULL, '2026-06-05T18:15:38.422Z', '00000000-0000-4000-a000-000000000012'),
  (53, 'The best code is the code you don''t write. Delete more, ship faster. 🗑️

#Flutter #Dart #Firebase', 'https://picsum.photos/seed/post-18-2/600/400', '2026-06-05T17:15:38.422Z', '00000000-0000-4000-a000-000000000012'),
  (54, 'Deployed to production on a Friday and nothing broke. Is this real life? 😱

#TypeScript #React #Node.js', 'https://picsum.photos/seed/post-18-3/600/400', '2026-06-05T16:15:38.422Z', '00000000-0000-4000-a000-000000000012'),
  (55, 'Nothing beats the feeling of deploying on a Friday and watching those green checkmarks roll in. ✅

#Elixir #Phoenix #PostgreSQL', NULL, '2026-06-05T15:15:38.422Z', '00000000-0000-4000-a000-000000000013'),
  (56, 'Contemplating life choices while debugging a production issue at 11 PM. Send help. 😂

#Flutter #Dart #Firebase', 'https://picsum.photos/seed/post-19-1/600/400', '2026-06-05T14:15:38.422Z', '00000000-0000-4000-a000-000000000013'),
  (57, 'Attended an amazing conference today. So inspired by all the innovative projects people are building. 🌟

#Flutter #Dart #Firebase', 'https://picsum.photos/seed/post-20-0/600/400', '2026-06-05T13:15:38.422Z', '00000000-0000-4000-a000-000000000014'),
  (58, 'Our team just won the internal hackathon! 48 hours of intense coding, minimal sleep, maximum fun. 🏅

#TypeScript #React #Node.js', 'https://picsum.photos/seed/post-20-1/600/400', '2026-06-05T12:15:38.422Z', '00000000-0000-4000-a000-000000000014'),
  (59, 'Working from a coffee shop today. Sometimes a change of scenery is all you need. ☕

#Python #FastAPI #PostgreSQL', NULL, '2026-06-05T11:15:38.422Z', '00000000-0000-4000-a000-000000000014'),
  (60, 'The new MacBook Pro is incredible. The battery life alone is worth the upgrade. 💻

#TypeScript #React #Node.js', 'https://picsum.photos/seed/post-21-0/600/400', '2026-06-07T22:15:38.422Z', '00000000-0000-4000-a000-000000000015'),
  (61, 'Built a CLI tool today that saves 5 minutes per developer per day. Small wins add up! 🛠️

#Python #FastAPI #PostgreSQL', NULL, '2026-06-07T21:15:38.422Z', '00000000-0000-4000-a000-000000000015'),
  (62, 'Just learned about WebSockets and I feel like I''ve been missing out my whole career. 🕸️

#Rust #WebAssembly #JavaScript', 'https://picsum.photos/seed/post-21-2/600/400', '2026-06-07T20:15:38.422Z', '00000000-0000-4000-a000-000000000015'),
  (63, 'Beautiful sunset from the office rooftop today. Sometimes you just need to pause and appreciate the view. 🌅

#Go #Docker #Kubernetes', 'https://picsum.photos/seed/post-21-3/600/400', '2026-06-07T19:15:38.422Z', '00000000-0000-4000-a000-000000000015'),
  (64, 'Finally understanding Rust''s borrow checker. It only took me 3 months. 😤

#Python #FastAPI #PostgreSQL', NULL, '2026-06-07T18:15:38.422Z', '00000000-0000-4000-a000-000000000016'),
  (65, 'Imposter syndrome is real, but remember: you got hired for a reason. You belong here. 💪

#Rust #WebAssembly #JavaScript', 'https://picsum.photos/seed/post-22-1/600/400', '2026-06-07T17:15:38.422Z', '00000000-0000-4000-a000-000000000016'),
  (66, 'Shoutout to my mentor who taught me that clean code is not about perfection, it''s about empathy for the next developer. 🙏

#Rust #WebAssembly #JavaScript', 'https://picsum.photos/seed/post-23-0/600/400', '2026-06-07T16:15:38.422Z', '00000000-0000-4000-a000-000000000017'),
  (67, 'Just wrapped up a massive refactor. The codebase feels 10 years younger. Clean architecture is worth the investment. 🏗️

#Go #Docker #Kubernetes', 'https://picsum.photos/seed/post-23-1/600/400', '2026-06-07T15:15:38.422Z', '00000000-0000-4000-a000-000000000017'),
  (68, 'Pro tip: always write tests BEFORE you refactor. Future you will be grateful. 🧪

#React #Next.js #Tailwind', NULL, '2026-06-07T14:15:38.422Z', '00000000-0000-4000-a000-000000000017'),
  (69, 'Late night coding session with lofi beats in the background. This is my happy place. 🎧

#Go #Docker #Kubernetes', 'https://picsum.photos/seed/post-24-0/600/400', '2026-06-07T13:15:38.422Z', '00000000-0000-4000-a000-000000000018'),
  (70, 'Trying out a new productivity technique: 25 minutes of focused work, 5 minute breaks. So far so good! ⏱️

#React #Next.js #Tailwind', NULL, '2026-06-07T12:15:38.422Z', '00000000-0000-4000-a000-000000000018'),
  (71, 'The developer community is amazing. Asked a question on Stack Overflow and got 5 helpful answers in 10 minutes. ❤️

#Vue.js #Nuxt #TypeScript', 'https://picsum.photos/seed/post-24-2/600/400', '2026-06-07T11:15:38.422Z', '00000000-0000-4000-a000-000000000018'),
  (72, 'Just finished reading ''Atomic Habits'' by James Clear. Game changer for productivity! 📚

#Swift #iOS #Xcode', 'https://picsum.photos/seed/post-24-3/600/400', '2026-06-07T10:15:38.422Z', '00000000-0000-4000-a000-000000000018'),
  (73, 'Just automated a task that used to take me 2 hours every day. That''s 40 hours a month back. 🤯

#React #Next.js #Tailwind', NULL, '2026-06-07T09:15:38.422Z', '00000000-0000-4000-a000-000000000019'),
  (74, 'The best code is the code you don''t write. Delete more, ship faster. 🗑️

#Vue.js #Nuxt #TypeScript', 'https://picsum.photos/seed/post-25-1/600/400', '2026-06-07T08:15:38.422Z', '00000000-0000-4000-a000-000000000019'),
  (75, 'Contemplating life choices while debugging a production issue at 11 PM. Send help. 😂

#Vue.js #Nuxt #TypeScript', 'https://picsum.photos/seed/post-26-0/600/400', '2026-06-07T07:15:38.422Z', '00000000-0000-4000-a000-00000000001a');

INSERT INTO public.posts (id, content, img, created_at, user_id) VALUES
  (76, 'Nothing like the feeling of solving a bug that''s been haunting you for days. Victory dance! 💃

#Swift #iOS #Xcode', 'https://picsum.photos/seed/post-26-1/600/400', '2026-06-07T06:15:38.422Z', '00000000-0000-4000-a000-00000000001a'),
  (77, 'Taking a well-deserved vacation after shipping the biggest project of my career. See you in a week! ✈️

#Kotlin #Android #Firebase', NULL, '2026-06-07T05:15:38.422Z', '00000000-0000-4000-a000-00000000001a'),
  (78, 'Our team just won the internal hackathon! 48 hours of intense coding, minimal sleep, maximum fun. 🏅

#Swift #iOS #Xcode', 'https://picsum.photos/seed/post-27-0/600/400', '2026-06-07T04:15:38.422Z', '00000000-0000-4000-a000-00000000001b'),
  (79, 'Working from a coffee shop today. Sometimes a change of scenery is all you need. ☕

#Kotlin #Android #Firebase', NULL, '2026-06-07T03:15:38.422Z', '00000000-0000-4000-a000-00000000001b'),
  (80, 'Just launched a new feature! After weeks of hard work, it''s finally live. The team did an amazing job. Check it out and let me know what you think! 🚀

#C# #.NET #Azure', 'https://picsum.photos/seed/post-27-2/600/400', '2026-06-07T02:15:38.422Z', '00000000-0000-4000-a000-00000000001b'),
  (81, 'Finally optimized our database queries. From 5 seconds to 50 milliseconds. Sometimes the simple fixes make the biggest difference. ⚡

#Java #Spring #AWS', 'https://picsum.photos/seed/post-27-3/600/400', '2026-06-07T01:15:38.422Z', '00000000-0000-4000-a000-00000000001b'),
  (82, 'Built a CLI tool today that saves 5 minutes per developer per day. Small wins add up! 🛠️

#Kotlin #Android #Firebase', NULL, '2026-06-07T00:15:38.422Z', '00000000-0000-4000-a000-00000000001c'),
  (83, 'Just learned about WebSockets and I feel like I''ve been missing out my whole career. 🕸️

#C# #.NET #Azure', 'https://picsum.photos/seed/post-28-1/600/400', '2026-06-06T23:15:38.422Z', '00000000-0000-4000-a000-00000000001c'),
  (84, 'Imposter syndrome is real, but remember: you got hired for a reason. You belong here. 💪

#C# #.NET #Azure', 'https://picsum.photos/seed/post-29-0/600/400', '2026-06-06T22:15:38.422Z', '00000000-0000-4000-a000-00000000001d'),
  (85, '5 years ago I wrote my first line of code. Today I lead a team of 10 engineers. Time flies! 🚀

#Java #Spring #AWS', 'https://picsum.photos/seed/post-29-1/600/400', '2026-06-06T21:15:38.422Z', '00000000-0000-4000-a000-00000000001d'),
  (86, 'Hot take: TypeScript is the best thing that happened to JavaScript. Fight me. 🔥

#TypeScript #GraphQL #Prisma', NULL, '2026-06-06T20:15:38.422Z', '00000000-0000-4000-a000-00000000001d'),
  (87, 'Just wrapped up a massive refactor. The codebase feels 10 years younger. Clean architecture is worth the investment. 🏗️

#Java #Spring #AWS', 'https://picsum.photos/seed/post-30-0/600/400', '2026-06-06T19:15:38.422Z', '00000000-0000-4000-a000-00000000001e'),
  (88, 'Pro tip: always write tests BEFORE you refactor. Future you will be grateful. 🧪

#TypeScript #GraphQL #Prisma', NULL, '2026-06-06T18:15:38.422Z', '00000000-0000-4000-a000-00000000001e'),
  (89, 'Spent the weekend hiking in the mountains. No reception, no emails, just pure nature. Highly recommend! 🏔️

#React #React Native #Expo', 'https://picsum.photos/seed/post-30-2/600/400', '2026-06-06T17:15:38.422Z', '00000000-0000-4000-a000-00000000001e'),
  (90, 'Just discovered a new framework and I''m obsessed. This is why I love this industry - there''s always something new to learn! 🔥

#Svelte #SvelteKit #Vite', 'https://picsum.photos/seed/post-30-3/600/400', '2026-06-06T16:15:38.422Z', '00000000-0000-4000-a000-00000000001e'),
  (91, 'Trying out a new productivity technique: 25 minutes of focused work, 5 minute breaks. So far so good! ⏱️

#TypeScript #GraphQL #Prisma', NULL, '2026-06-06T15:15:38.422Z', '00000000-0000-4000-a000-00000000001f'),
  (92, 'The developer community is amazing. Asked a question on Stack Overflow and got 5 helpful answers in 10 minutes. ❤️

#React #React Native #Expo', 'https://picsum.photos/seed/post-31-1/600/400', '2026-06-06T14:15:38.422Z', '00000000-0000-4000-a000-00000000001f'),
  (93, 'The best code is the code you don''t write. Delete more, ship faster. 🗑️

#React #React Native #Expo', 'https://picsum.photos/seed/post-32-0/600/400', '2026-06-06T13:15:38.422Z', '00000000-0000-4000-a000-000000000020'),
  (94, 'Deployed to production on a Friday and nothing broke. Is this real life? 😱

#Svelte #SvelteKit #Vite', 'https://picsum.photos/seed/post-32-1/600/400', '2026-06-06T12:15:38.422Z', '00000000-0000-4000-a000-000000000020'),
  (95, 'New blog post is up! I wrote about my journey from junior to senior developer and the lessons I learned along the way. Link in bio! ✍️

#Solid.js #TypeScript #Vite', NULL, '2026-06-06T11:15:38.422Z', '00000000-0000-4000-a000-000000000020'),
  (96, 'Nothing like the feeling of solving a bug that''s been haunting you for days. Victory dance! 💃

#Svelte #SvelteKit #Vite', 'https://picsum.photos/seed/post-33-0/600/400', '2026-06-06T10:15:38.422Z', '00000000-0000-4000-a000-000000000021'),
  (97, 'Taking a well-deserved vacation after shipping the biggest project of my career. See you in a week! ✈️

#Solid.js #TypeScript #Vite', NULL, '2026-06-06T09:15:38.422Z', '00000000-0000-4000-a000-000000000021'),
  (98, 'Coffee and code. Name a better duo. I''ll wait. ☕💻

#Next.js #Supabase #Tailwind', 'https://picsum.photos/seed/post-33-2/600/400', '2026-06-06T08:15:38.422Z', '00000000-0000-4000-a000-000000000021'),
  (99, 'Does anyone else refactor code at 2 AM just because you can''t sleep thinking about a better solution? 😅

#Python #Django #PostgreSQL', 'https://picsum.photos/seed/post-33-3/600/400', '2026-06-06T07:15:38.422Z', '00000000-0000-4000-a000-000000000021'),
  (100, 'Working from a coffee shop today. Sometimes a change of scenery is all you need. ☕

#Solid.js #TypeScript #Vite', NULL, '2026-06-06T06:15:38.422Z', '00000000-0000-4000-a000-000000000022');

INSERT INTO public.posts (id, content, img, created_at, user_id) VALUES
  (101, 'Just launched a new feature! After weeks of hard work, it''s finally live. The team did an amazing job. Check it out and let me know what you think! 🚀

#Next.js #Supabase #Tailwind', 'https://picsum.photos/seed/post-34-1/600/400', '2026-06-06T05:15:38.422Z', '00000000-0000-4000-a000-000000000022'),
  (102, 'Just learned about WebSockets and I feel like I''ve been missing out my whole career. 🕸️

#Next.js #Supabase #Tailwind', 'https://picsum.photos/seed/post-35-0/600/400', '2026-06-06T04:15:38.422Z', '00000000-0000-4000-a000-000000000023'),
  (103, 'Beautiful sunset from the office rooftop today. Sometimes you just need to pause and appreciate the view. 🌅

#Python #Django #PostgreSQL', 'https://picsum.photos/seed/post-35-1/600/400', '2026-06-06T03:15:38.422Z', '00000000-0000-4000-a000-000000000023'),
  (104, 'Throwback to my first hackathon. We built a social media app in 48 hours. Look at us now! 🏆

#PHP #Laravel #MySQL', NULL, '2026-06-06T02:15:38.422Z', '00000000-0000-4000-a000-000000000023'),
  (105, '5 years ago I wrote my first line of code. Today I lead a team of 10 engineers. Time flies! 🚀

#Python #Django #PostgreSQL', 'https://picsum.photos/seed/post-36-0/600/400', '2026-06-06T01:15:38.422Z', '00000000-0000-4000-a000-000000000024'),
  (106, 'Hot take: TypeScript is the best thing that happened to JavaScript. Fight me. 🔥

#PHP #Laravel #MySQL', NULL, '2026-06-06T00:15:38.422Z', '00000000-0000-4000-a000-000000000024'),
  (107, 'Great team meeting today. Love working with people who challenge me to be better. 🤝

#Ruby #Rails #Heroku', 'https://picsum.photos/seed/post-36-2/600/400', '2026-06-05T23:15:38.422Z', '00000000-0000-4000-a000-000000000024'),
  (108, 'Happy Monday! Starting the week with a fresh perspective and a todo list that''s actually realistic. 📋

#Elixir #Phoenix #PostgreSQL', 'https://picsum.photos/seed/post-36-3/600/400', '2026-06-05T22:15:38.422Z', '00000000-0000-4000-a000-000000000024'),
  (109, 'Pro tip: always write tests BEFORE you refactor. Future you will be grateful. 🧪

#PHP #Laravel #MySQL', NULL, '2026-06-05T21:15:38.422Z', '00000000-0000-4000-a000-000000000025'),
  (110, 'Spent the weekend hiking in the mountains. No reception, no emails, just pure nature. Highly recommend! 🏔️

#Ruby #Rails #Heroku', 'https://picsum.photos/seed/post-37-1/600/400', '2026-06-05T20:15:38.422Z', '00000000-0000-4000-a000-000000000025'),
  (111, 'The developer community is amazing. Asked a question on Stack Overflow and got 5 helpful answers in 10 minutes. ❤️

#Ruby #Rails #Heroku', 'https://picsum.photos/seed/post-38-0/600/400', '2026-06-05T19:15:38.422Z', '00000000-0000-4000-a000-000000000026'),
  (112, 'Just finished reading ''Atomic Habits'' by James Clear. Game changer for productivity! 📚

#Elixir #Phoenix #PostgreSQL', 'https://picsum.photos/seed/post-38-1/600/400', '2026-06-05T18:15:38.422Z', '00000000-0000-4000-a000-000000000026'),
  (113, 'Weekend vibes. Grilling some burgers and enjoying the weather. Life is good. 🍔☀️

#Flutter #Dart #Firebase', NULL, '2026-06-05T17:15:38.422Z', '00000000-0000-4000-a000-000000000026'),
  (114, 'Deployed to production on a Friday and nothing broke. Is this real life? 😱

#Elixir #Phoenix #PostgreSQL', 'https://picsum.photos/seed/post-39-0/600/400', '2026-06-05T16:15:38.422Z', '00000000-0000-4000-a000-000000000027'),
  (115, 'New blog post is up! I wrote about my journey from junior to senior developer and the lessons I learned along the way. Link in bio! ✍️

#Flutter #Dart #Firebase', NULL, '2026-06-05T15:15:38.422Z', '00000000-0000-4000-a000-000000000027'),
  (116, 'Proud moment: my PR just got merged into a major open source project! 🎉

#TypeScript #React #Node.js', 'https://picsum.photos/seed/post-39-2/600/400', '2026-06-05T14:15:38.422Z', '00000000-0000-4000-a000-000000000027'),
  (117, 'Attended an amazing conference today. So inspired by all the innovative projects people are building. 🌟

#Python #FastAPI #PostgreSQL', 'https://picsum.photos/seed/post-39-3/600/400', '2026-06-05T13:15:38.422Z', '00000000-0000-4000-a000-000000000027'),
  (118, 'Taking a well-deserved vacation after shipping the biggest project of my career. See you in a week! ✈️

#Flutter #Dart #Firebase', NULL, '2026-06-05T12:15:38.422Z', '00000000-0000-4000-a000-000000000028'),
  (119, 'Coffee and code. Name a better duo. I''ll wait. ☕💻

#TypeScript #React #Node.js', 'https://picsum.photos/seed/post-40-1/600/400', '2026-06-05T11:15:38.422Z', '00000000-0000-4000-a000-000000000028'),
  (120, 'Just launched a new feature! After weeks of hard work, it''s finally live. The team did an amazing job. Check it out and let me know what you think! 🚀

#TypeScript #React #Node.js', 'https://picsum.photos/seed/post-41-0/600/400', '2026-06-07T22:15:38.422Z', '00000000-0000-4000-a000-000000000029'),
  (121, 'Finally optimized our database queries. From 5 seconds to 50 milliseconds. Sometimes the simple fixes make the biggest difference. ⚡

#Python #FastAPI #PostgreSQL', 'https://picsum.photos/seed/post-41-1/600/400', '2026-06-07T21:15:38.422Z', '00000000-0000-4000-a000-000000000029'),
  (122, 'New desk setup is complete! Dual monitors, mechanical keyboard, and way too many plants. 🌿

#Rust #WebAssembly #JavaScript', NULL, '2026-06-07T20:15:38.422Z', '00000000-0000-4000-a000-000000000029'),
  (123, 'Beautiful sunset from the office rooftop today. Sometimes you just need to pause and appreciate the view. 🌅

#Python #FastAPI #PostgreSQL', 'https://picsum.photos/seed/post-42-0/600/400', '2026-06-07T19:15:38.422Z', '00000000-0000-4000-a000-00000000002a'),
  (124, 'Throwback to my first hackathon. We built a social media app in 48 hours. Look at us now! 🏆

#Rust #WebAssembly #JavaScript', NULL, '2026-06-07T18:15:38.422Z', '00000000-0000-4000-a000-00000000002a'),
  (125, 'Just gave a talk at a local meetup about microservices architecture. The Q&A session was incredible! 🎤

#Go #Docker #Kubernetes', 'https://picsum.photos/seed/post-42-2/600/400', '2026-06-07T17:15:38.422Z', '00000000-0000-4000-a000-00000000002a');

INSERT INTO public.posts (id, content, img, created_at, user_id) VALUES
  (126, 'Shoutout to my mentor who taught me that clean code is not about perfection, it''s about empathy for the next developer. 🙏

#React #Next.js #Tailwind', 'https://picsum.photos/seed/post-42-3/600/400', '2026-06-07T16:15:38.422Z', '00000000-0000-4000-a000-00000000002a'),
  (127, 'Hot take: TypeScript is the best thing that happened to JavaScript. Fight me. 🔥

#Rust #WebAssembly #JavaScript', NULL, '2026-06-07T15:15:38.422Z', '00000000-0000-4000-a000-00000000002b'),
  (128, 'Great team meeting today. Love working with people who challenge me to be better. 🤝

#Go #Docker #Kubernetes', 'https://picsum.photos/seed/post-43-1/600/400', '2026-06-07T14:15:38.422Z', '00000000-0000-4000-a000-00000000002b'),
  (129, 'Spent the weekend hiking in the mountains. No reception, no emails, just pure nature. Highly recommend! 🏔️

#Go #Docker #Kubernetes', 'https://picsum.photos/seed/post-44-0/600/400', '2026-06-07T13:15:38.422Z', '00000000-0000-4000-a000-00000000002c'),
  (130, 'Just discovered a new framework and I''m obsessed. This is why I love this industry - there''s always something new to learn! 🔥

#React #Next.js #Tailwind', 'https://picsum.photos/seed/post-44-1/600/400', '2026-06-07T12:15:38.422Z', '00000000-0000-4000-a000-00000000002c'),
  (131, 'Migration from REST to GraphQL went smoother than expected. 6 hours of work, zero downtime. 💪

#Vue.js #Nuxt #TypeScript', NULL, '2026-06-07T11:15:38.422Z', '00000000-0000-4000-a000-00000000002c'),
  (132, 'Just finished reading ''Atomic Habits'' by James Clear. Game changer for productivity! 📚

#React #Next.js #Tailwind', 'https://picsum.photos/seed/post-45-0/600/400', '2026-06-07T10:15:38.422Z', '00000000-0000-4000-a000-00000000002d'),
  (133, 'Weekend vibes. Grilling some burgers and enjoying the weather. Life is good. 🍔☀️

#Vue.js #Nuxt #TypeScript', NULL, '2026-06-07T09:15:38.422Z', '00000000-0000-4000-a000-00000000002d'),
  (134, 'Nothing beats the feeling of deploying on a Friday and watching those green checkmarks roll in. ✅

#Swift #iOS #Xcode', 'https://picsum.photos/seed/post-45-2/600/400', '2026-06-07T08:15:38.422Z', '00000000-0000-4000-a000-00000000002d'),
  (135, 'Contemplating life choices while debugging a production issue at 11 PM. Send help. 😂

#Kotlin #Android #Firebase', 'https://picsum.photos/seed/post-45-3/600/400', '2026-06-07T07:15:38.422Z', '00000000-0000-4000-a000-00000000002d'),
  (136, 'New blog post is up! I wrote about my journey from junior to senior developer and the lessons I learned along the way. Link in bio! ✍️

#Vue.js #Nuxt #TypeScript', NULL, '2026-06-07T06:15:38.422Z', '00000000-0000-4000-a000-00000000002e'),
  (137, 'Proud moment: my PR just got merged into a major open source project! 🎉

#Swift #iOS #Xcode', 'https://picsum.photos/seed/post-46-1/600/400', '2026-06-07T05:15:38.422Z', '00000000-0000-4000-a000-00000000002e'),
  (138, 'Coffee and code. Name a better duo. I''ll wait. ☕💻

#Swift #iOS #Xcode', 'https://picsum.photos/seed/post-47-0/600/400', '2026-06-07T04:15:38.422Z', '00000000-0000-4000-a000-00000000002f'),
  (139, 'Does anyone else refactor code at 2 AM just because you can''t sleep thinking about a better solution? 😅

#Kotlin #Android #Firebase', 'https://picsum.photos/seed/post-47-1/600/400', '2026-06-07T03:15:38.422Z', '00000000-0000-4000-a000-00000000002f'),
  (140, 'The new MacBook Pro is incredible. The battery life alone is worth the upgrade. 💻

#C# #.NET #Azure', NULL, '2026-06-07T02:15:38.422Z', '00000000-0000-4000-a000-00000000002f'),
  (141, 'Finally optimized our database queries. From 5 seconds to 50 milliseconds. Sometimes the simple fixes make the biggest difference. ⚡

#Kotlin #Android #Firebase', 'https://picsum.photos/seed/post-48-0/600/400', '2026-06-07T01:15:38.422Z', '00000000-0000-4000-a000-000000000030'),
  (142, 'New desk setup is complete! Dual monitors, mechanical keyboard, and way too many plants. 🌿

#C# #.NET #Azure', NULL, '2026-06-07T00:15:38.422Z', '00000000-0000-4000-a000-000000000030'),
  (143, 'Finally understanding Rust''s borrow checker. It only took me 3 months. 😤

#Java #Spring #AWS', 'https://picsum.photos/seed/post-48-2/600/400', '2026-06-06T23:15:38.422Z', '00000000-0000-4000-a000-000000000030'),
  (144, 'Imposter syndrome is real, but remember: you got hired for a reason. You belong here. 💪

#TypeScript #GraphQL #Prisma', 'https://picsum.photos/seed/post-48-3/600/400', '2026-06-06T22:15:38.422Z', '00000000-0000-4000-a000-000000000030'),
  (145, 'Throwback to my first hackathon. We built a social media app in 48 hours. Look at us now! 🏆

#C# #.NET #Azure', NULL, '2026-06-06T21:15:38.422Z', '00000000-0000-4000-a000-000000000031'),
  (146, 'Just gave a talk at a local meetup about microservices architecture. The Q&A session was incredible! 🎤

#Java #Spring #AWS', 'https://picsum.photos/seed/post-49-1/600/400', '2026-06-06T20:15:38.422Z', '00000000-0000-4000-a000-000000000031'),
  (147, 'Great team meeting today. Love working with people who challenge me to be better. 🤝

#Java #Spring #AWS', 'https://picsum.photos/seed/post-50-0/600/400', '2026-06-06T19:15:38.422Z', '00000000-0000-4000-a000-000000000032'),
  (148, 'Happy Monday! Starting the week with a fresh perspective and a todo list that''s actually realistic. 📋

#TypeScript #GraphQL #Prisma', 'https://picsum.photos/seed/post-50-1/600/400', '2026-06-06T18:15:38.422Z', '00000000-0000-4000-a000-000000000032'),
  (149, 'Late night coding session with lofi beats in the background. This is my happy place. 🎧

#React #React Native #Expo', NULL, '2026-06-06T17:15:38.422Z', '00000000-0000-4000-a000-000000000032'),
  (150, 'Just discovered a new framework and I''m obsessed. This is why I love this industry - there''s always something new to learn! 🔥

#TypeScript #GraphQL #Prisma', 'https://picsum.photos/seed/post-51-0/600/400', '2026-06-06T16:15:38.422Z', '00000000-0000-4000-a000-000000000033');

INSERT INTO public.posts (id, content, img, created_at, user_id) VALUES
  (151, 'Migration from REST to GraphQL went smoother than expected. 6 hours of work, zero downtime. 💪

#React #React Native #Expo', NULL, '2026-06-06T15:15:38.422Z', '00000000-0000-4000-a000-000000000033'),
  (152, 'Just automated a task that used to take me 2 hours every day. That''s 40 hours a month back. 🤯

#Svelte #SvelteKit #Vite', 'https://picsum.photos/seed/post-51-2/600/400', '2026-06-06T14:15:38.422Z', '00000000-0000-4000-a000-000000000033'),
  (153, 'The best code is the code you don''t write. Delete more, ship faster. 🗑️

#Solid.js #TypeScript #Vite', 'https://picsum.photos/seed/post-51-3/600/400', '2026-06-06T13:15:38.422Z', '00000000-0000-4000-a000-000000000033'),
  (154, 'Weekend vibes. Grilling some burgers and enjoying the weather. Life is good. 🍔☀️

#React #React Native #Expo', NULL, '2026-06-06T12:15:38.423Z', '00000000-0000-4000-a000-000000000034'),
  (155, 'Nothing beats the feeling of deploying on a Friday and watching those green checkmarks roll in. ✅

#Svelte #SvelteKit #Vite', 'https://picsum.photos/seed/post-52-1/600/400', '2026-06-06T11:15:38.423Z', '00000000-0000-4000-a000-000000000034'),
  (156, 'Proud moment: my PR just got merged into a major open source project! 🎉

#Svelte #SvelteKit #Vite', 'https://picsum.photos/seed/post-53-0/600/400', '2026-06-06T10:15:38.423Z', '00000000-0000-4000-a000-000000000035'),
  (157, 'Attended an amazing conference today. So inspired by all the innovative projects people are building. 🌟

#Solid.js #TypeScript #Vite', 'https://picsum.photos/seed/post-53-1/600/400', '2026-06-06T09:15:38.423Z', '00000000-0000-4000-a000-000000000035'),
  (158, 'Our team just won the internal hackathon! 48 hours of intense coding, minimal sleep, maximum fun. 🏅

#Next.js #Supabase #Tailwind', NULL, '2026-06-06T08:15:38.423Z', '00000000-0000-4000-a000-000000000035'),
  (159, 'Does anyone else refactor code at 2 AM just because you can''t sleep thinking about a better solution? 😅

#Solid.js #TypeScript #Vite', 'https://picsum.photos/seed/post-54-0/600/400', '2026-06-06T07:15:38.423Z', '00000000-0000-4000-a000-000000000036'),
  (160, 'The new MacBook Pro is incredible. The battery life alone is worth the upgrade. 💻

#Next.js #Supabase #Tailwind', NULL, '2026-06-06T06:15:38.423Z', '00000000-0000-4000-a000-000000000036'),
  (161, 'Built a CLI tool today that saves 5 minutes per developer per day. Small wins add up! 🛠️

#Python #Django #PostgreSQL', 'https://picsum.photos/seed/post-54-2/600/400', '2026-06-06T05:15:38.423Z', '00000000-0000-4000-a000-000000000036'),
  (162, 'Just learned about WebSockets and I feel like I''ve been missing out my whole career. 🕸️

#PHP #Laravel #MySQL', 'https://picsum.photos/seed/post-54-3/600/400', '2026-06-06T04:15:38.423Z', '00000000-0000-4000-a000-000000000036'),
  (163, 'New desk setup is complete! Dual monitors, mechanical keyboard, and way too many plants. 🌿

#Next.js #Supabase #Tailwind', NULL, '2026-06-06T03:15:38.423Z', '00000000-0000-4000-a000-000000000037'),
  (164, 'Finally understanding Rust''s borrow checker. It only took me 3 months. 😤

#Python #Django #PostgreSQL', 'https://picsum.photos/seed/post-55-1/600/400', '2026-06-06T02:15:38.423Z', '00000000-0000-4000-a000-000000000037'),
  (165, 'Just gave a talk at a local meetup about microservices architecture. The Q&A session was incredible! 🎤

#Python #Django #PostgreSQL', 'https://picsum.photos/seed/post-56-0/600/400', '2026-06-06T01:15:38.423Z', '00000000-0000-4000-a000-000000000038'),
  (166, 'Shoutout to my mentor who taught me that clean code is not about perfection, it''s about empathy for the next developer. 🙏

#PHP #Laravel #MySQL', 'https://picsum.photos/seed/post-56-1/600/400', '2026-06-06T00:15:38.423Z', '00000000-0000-4000-a000-000000000038'),
  (167, 'Just wrapped up a massive refactor. The codebase feels 10 years younger. Clean architecture is worth the investment. 🏗️

#Ruby #Rails #Heroku', NULL, '2026-06-05T23:15:38.423Z', '00000000-0000-4000-a000-000000000038'),
  (168, 'Happy Monday! Starting the week with a fresh perspective and a todo list that''s actually realistic. 📋

#PHP #Laravel #MySQL', 'https://picsum.photos/seed/post-57-0/600/400', '2026-06-05T22:15:38.423Z', '00000000-0000-4000-a000-000000000039'),
  (169, 'Late night coding session with lofi beats in the background. This is my happy place. 🎧

#Ruby #Rails #Heroku', NULL, '2026-06-05T21:15:38.423Z', '00000000-0000-4000-a000-000000000039'),
  (170, 'Trying out a new productivity technique: 25 minutes of focused work, 5 minute breaks. So far so good! ⏱️

#Elixir #Phoenix #PostgreSQL', 'https://picsum.photos/seed/post-57-2/600/400', '2026-06-05T20:15:38.423Z', '00000000-0000-4000-a000-000000000039'),
  (171, 'The developer community is amazing. Asked a question on Stack Overflow and got 5 helpful answers in 10 minutes. ❤️

#Flutter #Dart #Firebase', 'https://picsum.photos/seed/post-57-3/600/400', '2026-06-05T19:15:38.423Z', '00000000-0000-4000-a000-000000000039'),
  (172, 'Migration from REST to GraphQL went smoother than expected. 6 hours of work, zero downtime. 💪

#Ruby #Rails #Heroku', NULL, '2026-06-05T18:15:38.423Z', '00000000-0000-4000-a000-00000000003a'),
  (173, 'Just automated a task that used to take me 2 hours every day. That''s 40 hours a month back. 🤯

#Elixir #Phoenix #PostgreSQL', 'https://picsum.photos/seed/post-58-1/600/400', '2026-06-05T17:15:38.423Z', '00000000-0000-4000-a000-00000000003a'),
  (174, 'Nothing beats the feeling of deploying on a Friday and watching those green checkmarks roll in. ✅

#Elixir #Phoenix #PostgreSQL', 'https://picsum.photos/seed/post-59-0/600/400', '2026-06-05T16:15:38.423Z', '00000000-0000-4000-a000-00000000003b'),
  (175, 'Contemplating life choices while debugging a production issue at 11 PM. Send help. 😂

#Flutter #Dart #Firebase', 'https://picsum.photos/seed/post-59-1/600/400', '2026-06-05T15:15:38.423Z', '00000000-0000-4000-a000-00000000003b');

INSERT INTO public.posts (id, content, img, created_at, user_id) VALUES
  (176, 'Nothing like the feeling of solving a bug that''s been haunting you for days. Victory dance! 💃

#TypeScript #React #Node.js', NULL, '2026-06-05T14:15:38.423Z', '00000000-0000-4000-a000-00000000003b'),
  (177, 'Attended an amazing conference today. So inspired by all the innovative projects people are building. 🌟

#Flutter #Dart #Firebase', 'https://picsum.photos/seed/post-60-0/600/400', '2026-06-05T13:15:38.423Z', '00000000-0000-4000-a000-00000000003c'),
  (178, 'Our team just won the internal hackathon! 48 hours of intense coding, minimal sleep, maximum fun. 🏅

#TypeScript #React #Node.js', NULL, '2026-06-05T12:15:38.423Z', '00000000-0000-4000-a000-00000000003c'),
  (179, 'Working from a coffee shop today. Sometimes a change of scenery is all you need. ☕

#Python #FastAPI #PostgreSQL', 'https://picsum.photos/seed/post-60-2/600/400', '2026-06-05T11:15:38.423Z', '00000000-0000-4000-a000-00000000003c'),
  (180, 'Just launched a new feature! After weeks of hard work, it''s finally live. The team did an amazing job. Check it out and let me know what you think! 🚀

#Rust #WebAssembly #JavaScript', 'https://picsum.photos/seed/post-60-3/600/400', '2026-06-07T22:15:38.423Z', '00000000-0000-4000-a000-00000000003c'),
  (181, 'The new MacBook Pro is incredible. The battery life alone is worth the upgrade. 💻

#TypeScript #React #Node.js', NULL, '2026-06-07T21:15:38.423Z', '00000000-0000-4000-a000-00000000003d'),
  (182, 'Built a CLI tool today that saves 5 minutes per developer per day. Small wins add up! 🛠️

#Python #FastAPI #PostgreSQL', 'https://picsum.photos/seed/post-61-1/600/400', '2026-06-07T20:15:38.423Z', '00000000-0000-4000-a000-00000000003d'),
  (183, 'Finally understanding Rust''s borrow checker. It only took me 3 months. 😤

#Python #FastAPI #PostgreSQL', 'https://picsum.photos/seed/post-62-0/600/400', '2026-06-07T19:15:38.423Z', '00000000-0000-4000-a000-00000000003e'),
  (184, 'Imposter syndrome is real, but remember: you got hired for a reason. You belong here. 💪

#Rust #WebAssembly #JavaScript', 'https://picsum.photos/seed/post-62-1/600/400', '2026-06-07T18:15:38.423Z', '00000000-0000-4000-a000-00000000003e'),
  (185, '5 years ago I wrote my first line of code. Today I lead a team of 10 engineers. Time flies! 🚀

#Go #Docker #Kubernetes', NULL, '2026-06-07T17:15:38.423Z', '00000000-0000-4000-a000-00000000003e'),
  (186, 'Shoutout to my mentor who taught me that clean code is not about perfection, it''s about empathy for the next developer. 🙏

#Rust #WebAssembly #JavaScript', 'https://picsum.photos/seed/post-63-0/600/400', '2026-06-07T16:15:38.423Z', '00000000-0000-4000-a000-00000000003f'),
  (187, 'Just wrapped up a massive refactor. The codebase feels 10 years younger. Clean architecture is worth the investment. 🏗️

#Go #Docker #Kubernetes', NULL, '2026-06-07T15:15:38.423Z', '00000000-0000-4000-a000-00000000003f'),
  (188, 'Pro tip: always write tests BEFORE you refactor. Future you will be grateful. 🧪

#React #Next.js #Tailwind', 'https://picsum.photos/seed/post-63-2/600/400', '2026-06-07T14:15:38.423Z', '00000000-0000-4000-a000-00000000003f'),
  (189, 'Spent the weekend hiking in the mountains. No reception, no emails, just pure nature. Highly recommend! 🏔️

#Vue.js #Nuxt #TypeScript', 'https://picsum.photos/seed/post-63-3/600/400', '2026-06-07T13:15:38.423Z', '00000000-0000-4000-a000-00000000003f'),
  (190, 'Late night coding session with lofi beats in the background. This is my happy place. 🎧

#Go #Docker #Kubernetes', NULL, '2026-06-07T12:15:38.423Z', '00000000-0000-4000-a000-000000000040'),
  (191, 'Trying out a new productivity technique: 25 minutes of focused work, 5 minute breaks. So far so good! ⏱️

#React #Next.js #Tailwind', 'https://picsum.photos/seed/post-64-1/600/400', '2026-06-07T11:15:38.423Z', '00000000-0000-4000-a000-000000000040'),
  (192, 'Just automated a task that used to take me 2 hours every day. That''s 40 hours a month back. 🤯

#React #Next.js #Tailwind', 'https://picsum.photos/seed/post-65-0/600/400', '2026-06-07T10:15:38.423Z', '00000000-0000-4000-a000-000000000041'),
  (193, 'The best code is the code you don''t write. Delete more, ship faster. 🗑️

#Vue.js #Nuxt #TypeScript', 'https://picsum.photos/seed/post-65-1/600/400', '2026-06-07T09:15:38.423Z', '00000000-0000-4000-a000-000000000041'),
  (194, 'Deployed to production on a Friday and nothing broke. Is this real life? 😱

#Swift #iOS #Xcode', NULL, '2026-06-07T08:15:38.423Z', '00000000-0000-4000-a000-000000000041'),
  (195, 'Contemplating life choices while debugging a production issue at 11 PM. Send help. 😂

#Vue.js #Nuxt #TypeScript', 'https://picsum.photos/seed/post-66-0/600/400', '2026-06-07T07:15:38.423Z', '00000000-0000-4000-a000-000000000042'),
  (196, 'Nothing like the feeling of solving a bug that''s been haunting you for days. Victory dance! 💃

#Swift #iOS #Xcode', NULL, '2026-06-07T06:15:38.423Z', '00000000-0000-4000-a000-000000000042'),
  (197, 'Taking a well-deserved vacation after shipping the biggest project of my career. See you in a week! ✈️

#Kotlin #Android #Firebase', 'https://picsum.photos/seed/post-66-2/600/400', '2026-06-07T05:15:38.423Z', '00000000-0000-4000-a000-000000000042'),
  (198, 'Coffee and code. Name a better duo. I''ll wait. ☕💻

#C# #.NET #Azure', 'https://picsum.photos/seed/post-66-3/600/400', '2026-06-07T04:15:38.423Z', '00000000-0000-4000-a000-000000000042'),
  (199, 'Our team just won the internal hackathon! 48 hours of intense coding, minimal sleep, maximum fun. 🏅

#Swift #iOS #Xcode', NULL, '2026-06-07T03:15:38.423Z', '00000000-0000-4000-a000-000000000043'),
  (200, 'Working from a coffee shop today. Sometimes a change of scenery is all you need. ☕

#Kotlin #Android #Firebase', 'https://picsum.photos/seed/post-67-1/600/400', '2026-06-07T02:15:38.423Z', '00000000-0000-4000-a000-000000000043');

INSERT INTO public.posts (id, content, img, created_at, user_id) VALUES
  (201, 'Built a CLI tool today that saves 5 minutes per developer per day. Small wins add up! 🛠️

#Kotlin #Android #Firebase', 'https://picsum.photos/seed/post-68-0/600/400', '2026-06-07T01:15:38.423Z', '00000000-0000-4000-a000-000000000044'),
  (202, 'Just learned about WebSockets and I feel like I''ve been missing out my whole career. 🕸️

#C# #.NET #Azure', 'https://picsum.photos/seed/post-68-1/600/400', '2026-06-07T00:15:38.423Z', '00000000-0000-4000-a000-000000000044'),
  (203, 'Beautiful sunset from the office rooftop today. Sometimes you just need to pause and appreciate the view. 🌅

#Java #Spring #AWS', NULL, '2026-06-06T23:15:38.423Z', '00000000-0000-4000-a000-000000000044'),
  (204, 'Imposter syndrome is real, but remember: you got hired for a reason. You belong here. 💪

#C# #.NET #Azure', 'https://picsum.photos/seed/post-69-0/600/400', '2026-06-06T22:15:38.423Z', '00000000-0000-4000-a000-000000000045'),
  (205, '5 years ago I wrote my first line of code. Today I lead a team of 10 engineers. Time flies! 🚀

#Java #Spring #AWS', NULL, '2026-06-06T21:15:38.423Z', '00000000-0000-4000-a000-000000000045'),
  (206, 'Hot take: TypeScript is the best thing that happened to JavaScript. Fight me. 🔥

#TypeScript #GraphQL #Prisma', 'https://picsum.photos/seed/post-69-2/600/400', '2026-06-06T20:15:38.423Z', '00000000-0000-4000-a000-000000000045'),
  (207, 'Great team meeting today. Love working with people who challenge me to be better. 🤝

#React #React Native #Expo', 'https://picsum.photos/seed/post-69-3/600/400', '2026-06-06T19:15:38.423Z', '00000000-0000-4000-a000-000000000045'),
  (208, 'Just wrapped up a massive refactor. The codebase feels 10 years younger. Clean architecture is worth the investment. 🏗️

#Java #Spring #AWS', NULL, '2026-06-06T18:15:38.423Z', '00000000-0000-4000-a000-000000000046'),
  (209, 'Pro tip: always write tests BEFORE you refactor. Future you will be grateful. 🧪

#TypeScript #GraphQL #Prisma', 'https://picsum.photos/seed/post-70-1/600/400', '2026-06-06T17:15:38.423Z', '00000000-0000-4000-a000-000000000046'),
  (210, 'Trying out a new productivity technique: 25 minutes of focused work, 5 minute breaks. So far so good! ⏱️

#TypeScript #GraphQL #Prisma', 'https://picsum.photos/seed/post-71-0/600/400', '2026-06-06T16:15:38.423Z', '00000000-0000-4000-a000-000000000047'),
  (211, 'The developer community is amazing. Asked a question on Stack Overflow and got 5 helpful answers in 10 minutes. ❤️

#React #React Native #Expo', 'https://picsum.photos/seed/post-71-1/600/400', '2026-06-06T15:15:38.423Z', '00000000-0000-4000-a000-000000000047'),
  (212, 'Just finished reading ''Atomic Habits'' by James Clear. Game changer for productivity! 📚

#Svelte #SvelteKit #Vite', NULL, '2026-06-06T14:15:38.423Z', '00000000-0000-4000-a000-000000000047'),
  (213, 'The best code is the code you don''t write. Delete more, ship faster. 🗑️

#React #React Native #Expo', 'https://picsum.photos/seed/post-72-0/600/400', '2026-06-06T13:15:38.423Z', '00000000-0000-4000-a000-000000000048'),
  (214, 'Deployed to production on a Friday and nothing broke. Is this real life? 😱

#Svelte #SvelteKit #Vite', NULL, '2026-06-06T12:15:38.423Z', '00000000-0000-4000-a000-000000000048'),
  (215, 'New blog post is up! I wrote about my journey from junior to senior developer and the lessons I learned along the way. Link in bio! ✍️

#Solid.js #TypeScript #Vite', 'https://picsum.photos/seed/post-72-2/600/400', '2026-06-06T11:15:38.423Z', '00000000-0000-4000-a000-000000000048'),
  (216, 'Proud moment: my PR just got merged into a major open source project! 🎉

#Next.js #Supabase #Tailwind', 'https://picsum.photos/seed/post-72-3/600/400', '2026-06-06T10:15:38.423Z', '00000000-0000-4000-a000-000000000048'),
  (217, 'Nothing like the feeling of solving a bug that''s been haunting you for days. Victory dance! 💃

#Svelte #SvelteKit #Vite', NULL, '2026-06-06T09:15:38.423Z', '00000000-0000-4000-a000-000000000049'),
  (218, 'Taking a well-deserved vacation after shipping the biggest project of my career. See you in a week! ✈️

#Solid.js #TypeScript #Vite', 'https://picsum.photos/seed/post-73-1/600/400', '2026-06-06T08:15:38.423Z', '00000000-0000-4000-a000-000000000049'),
  (219, 'Working from a coffee shop today. Sometimes a change of scenery is all you need. ☕

#Solid.js #TypeScript #Vite', 'https://picsum.photos/seed/post-74-0/600/400', '2026-06-06T07:15:38.423Z', '00000000-0000-4000-a000-00000000004a'),
  (220, 'Just launched a new feature! After weeks of hard work, it''s finally live. The team did an amazing job. Check it out and let me know what you think! 🚀

#Next.js #Supabase #Tailwind', 'https://picsum.photos/seed/post-74-1/600/400', '2026-06-06T06:15:38.423Z', '00000000-0000-4000-a000-00000000004a'),
  (221, 'Finally optimized our database queries. From 5 seconds to 50 milliseconds. Sometimes the simple fixes make the biggest difference. ⚡

#Python #Django #PostgreSQL', NULL, '2026-06-06T05:15:38.423Z', '00000000-0000-4000-a000-00000000004a'),
  (222, 'Just learned about WebSockets and I feel like I''ve been missing out my whole career. 🕸️

#Next.js #Supabase #Tailwind', 'https://picsum.photos/seed/post-75-0/600/400', '2026-06-06T04:15:38.423Z', '00000000-0000-4000-a000-00000000004b'),
  (223, 'Beautiful sunset from the office rooftop today. Sometimes you just need to pause and appreciate the view. 🌅

#Python #Django #PostgreSQL', NULL, '2026-06-06T03:15:38.423Z', '00000000-0000-4000-a000-00000000004b'),
  (224, 'Throwback to my first hackathon. We built a social media app in 48 hours. Look at us now! 🏆

#PHP #Laravel #MySQL', 'https://picsum.photos/seed/post-75-2/600/400', '2026-06-06T02:15:38.423Z', '00000000-0000-4000-a000-00000000004b'),
  (225, 'Just gave a talk at a local meetup about microservices architecture. The Q&A session was incredible! 🎤

#Ruby #Rails #Heroku', 'https://picsum.photos/seed/post-75-3/600/400', '2026-06-06T01:15:38.423Z', '00000000-0000-4000-a000-00000000004b');

INSERT INTO public.posts (id, content, img, created_at, user_id) VALUES
  (226, '5 years ago I wrote my first line of code. Today I lead a team of 10 engineers. Time flies! 🚀

#Python #Django #PostgreSQL', NULL, '2026-06-06T00:15:38.423Z', '00000000-0000-4000-a000-00000000004c'),
  (227, 'Hot take: TypeScript is the best thing that happened to JavaScript. Fight me. 🔥

#PHP #Laravel #MySQL', 'https://picsum.photos/seed/post-76-1/600/400', '2026-06-05T23:15:38.423Z', '00000000-0000-4000-a000-00000000004c'),
  (228, 'Pro tip: always write tests BEFORE you refactor. Future you will be grateful. 🧪

#PHP #Laravel #MySQL', 'https://picsum.photos/seed/post-77-0/600/400', '2026-06-05T22:15:38.423Z', '00000000-0000-4000-a000-00000000004d'),
  (229, 'Spent the weekend hiking in the mountains. No reception, no emails, just pure nature. Highly recommend! 🏔️

#Ruby #Rails #Heroku', 'https://picsum.photos/seed/post-77-1/600/400', '2026-06-05T21:15:38.423Z', '00000000-0000-4000-a000-00000000004d'),
  (230, 'Just discovered a new framework and I''m obsessed. This is why I love this industry - there''s always something new to learn! 🔥

#Elixir #Phoenix #PostgreSQL', NULL, '2026-06-05T20:15:38.423Z', '00000000-0000-4000-a000-00000000004d'),
  (231, 'The developer community is amazing. Asked a question on Stack Overflow and got 5 helpful answers in 10 minutes. ❤️

#Ruby #Rails #Heroku', 'https://picsum.photos/seed/post-78-0/600/400', '2026-06-05T19:15:38.423Z', '00000000-0000-4000-a000-00000000004e'),
  (232, 'Just finished reading ''Atomic Habits'' by James Clear. Game changer for productivity! 📚

#Elixir #Phoenix #PostgreSQL', NULL, '2026-06-05T18:15:38.423Z', '00000000-0000-4000-a000-00000000004e'),
  (233, 'Weekend vibes. Grilling some burgers and enjoying the weather. Life is good. 🍔☀️

#Flutter #Dart #Firebase', 'https://picsum.photos/seed/post-78-2/600/400', '2026-06-05T17:15:38.423Z', '00000000-0000-4000-a000-00000000004e'),
  (234, 'Nothing beats the feeling of deploying on a Friday and watching those green checkmarks roll in. ✅

#TypeScript #React #Node.js', 'https://picsum.photos/seed/post-78-3/600/400', '2026-06-05T16:15:38.423Z', '00000000-0000-4000-a000-00000000004e'),
  (235, 'Deployed to production on a Friday and nothing broke. Is this real life? 😱

#Elixir #Phoenix #PostgreSQL', NULL, '2026-06-05T15:15:38.423Z', '00000000-0000-4000-a000-00000000004f'),
  (236, 'New blog post is up! I wrote about my journey from junior to senior developer and the lessons I learned along the way. Link in bio! ✍️

#Flutter #Dart #Firebase', 'https://picsum.photos/seed/post-79-1/600/400', '2026-06-05T14:15:38.423Z', '00000000-0000-4000-a000-00000000004f'),
  (237, 'Taking a well-deserved vacation after shipping the biggest project of my career. See you in a week! ✈️

#Flutter #Dart #Firebase', 'https://picsum.photos/seed/post-80-0/600/400', '2026-06-05T13:15:38.423Z', '00000000-0000-4000-a000-000000000050'),
  (238, 'Coffee and code. Name a better duo. I''ll wait. ☕💻

#TypeScript #React #Node.js', 'https://picsum.photos/seed/post-80-1/600/400', '2026-06-05T12:15:38.423Z', '00000000-0000-4000-a000-000000000050'),
  (239, 'Does anyone else refactor code at 2 AM just because you can''t sleep thinking about a better solution? 😅

#Python #FastAPI #PostgreSQL', NULL, '2026-06-05T11:15:38.423Z', '00000000-0000-4000-a000-000000000050'),
  (240, 'Just launched a new feature! After weeks of hard work, it''s finally live. The team did an amazing job. Check it out and let me know what you think! 🚀

#TypeScript #React #Node.js', 'https://picsum.photos/seed/post-81-0/600/400', '2026-06-07T22:15:38.423Z', '00000000-0000-4000-a000-000000000051'),
  (241, 'Finally optimized our database queries. From 5 seconds to 50 milliseconds. Sometimes the simple fixes make the biggest difference. ⚡

#Python #FastAPI #PostgreSQL', NULL, '2026-06-07T21:15:38.423Z', '00000000-0000-4000-a000-000000000051'),
  (242, 'New desk setup is complete! Dual monitors, mechanical keyboard, and way too many plants. 🌿

#Rust #WebAssembly #JavaScript', 'https://picsum.photos/seed/post-81-2/600/400', '2026-06-07T20:15:38.423Z', '00000000-0000-4000-a000-000000000051'),
  (243, 'Finally understanding Rust''s borrow checker. It only took me 3 months. 😤

#Go #Docker #Kubernetes', 'https://picsum.photos/seed/post-81-3/600/400', '2026-06-07T19:15:38.423Z', '00000000-0000-4000-a000-000000000051'),
  (244, 'Beautiful sunset from the office rooftop today. Sometimes you just need to pause and appreciate the view. 🌅

#Python #FastAPI #PostgreSQL', NULL, '2026-06-07T18:15:38.423Z', '00000000-0000-4000-a000-000000000052'),
  (245, 'Throwback to my first hackathon. We built a social media app in 48 hours. Look at us now! 🏆

#Rust #WebAssembly #JavaScript', 'https://picsum.photos/seed/post-82-1/600/400', '2026-06-07T17:15:38.423Z', '00000000-0000-4000-a000-000000000052'),
  (246, 'Hot take: TypeScript is the best thing that happened to JavaScript. Fight me. 🔥

#Rust #WebAssembly #JavaScript', 'https://picsum.photos/seed/post-83-0/600/400', '2026-06-07T16:15:38.423Z', '00000000-0000-4000-a000-000000000053'),
  (247, 'Great team meeting today. Love working with people who challenge me to be better. 🤝

#Go #Docker #Kubernetes', 'https://picsum.photos/seed/post-83-1/600/400', '2026-06-07T15:15:38.423Z', '00000000-0000-4000-a000-000000000053'),
  (248, 'Happy Monday! Starting the week with a fresh perspective and a todo list that''s actually realistic. 📋

#React #Next.js #Tailwind', NULL, '2026-06-07T14:15:38.423Z', '00000000-0000-4000-a000-000000000053'),
  (249, 'Spent the weekend hiking in the mountains. No reception, no emails, just pure nature. Highly recommend! 🏔️

#Go #Docker #Kubernetes', 'https://picsum.photos/seed/post-84-0/600/400', '2026-06-07T13:15:38.423Z', '00000000-0000-4000-a000-000000000054'),
  (250, 'Just discovered a new framework and I''m obsessed. This is why I love this industry - there''s always something new to learn! 🔥

#React #Next.js #Tailwind', NULL, '2026-06-07T12:15:38.423Z', '00000000-0000-4000-a000-000000000054');

INSERT INTO public.posts (id, content, img, created_at, user_id) VALUES
  (251, 'Migration from REST to GraphQL went smoother than expected. 6 hours of work, zero downtime. 💪

#Vue.js #Nuxt #TypeScript', 'https://picsum.photos/seed/post-84-2/600/400', '2026-06-07T11:15:38.423Z', '00000000-0000-4000-a000-000000000054'),
  (252, 'Just automated a task that used to take me 2 hours every day. That''s 40 hours a month back. 🤯

#Swift #iOS #Xcode', 'https://picsum.photos/seed/post-84-3/600/400', '2026-06-07T10:15:38.423Z', '00000000-0000-4000-a000-000000000054'),
  (253, 'Just finished reading ''Atomic Habits'' by James Clear. Game changer for productivity! 📚

#React #Next.js #Tailwind', NULL, '2026-06-07T09:15:38.423Z', '00000000-0000-4000-a000-000000000055'),
  (254, 'Weekend vibes. Grilling some burgers and enjoying the weather. Life is good. 🍔☀️

#Vue.js #Nuxt #TypeScript', 'https://picsum.photos/seed/post-85-1/600/400', '2026-06-07T08:15:38.423Z', '00000000-0000-4000-a000-000000000055'),
  (255, 'New blog post is up! I wrote about my journey from junior to senior developer and the lessons I learned along the way. Link in bio! ✍️

#Vue.js #Nuxt #TypeScript', 'https://picsum.photos/seed/post-86-0/600/400', '2026-06-07T07:15:38.423Z', '00000000-0000-4000-a000-000000000056'),
  (256, 'Proud moment: my PR just got merged into a major open source project! 🎉

#Swift #iOS #Xcode', 'https://picsum.photos/seed/post-86-1/600/400', '2026-06-07T06:15:38.423Z', '00000000-0000-4000-a000-000000000056'),
  (257, 'Attended an amazing conference today. So inspired by all the innovative projects people are building. 🌟

#Kotlin #Android #Firebase', NULL, '2026-06-07T05:15:38.423Z', '00000000-0000-4000-a000-000000000056'),
  (258, 'Coffee and code. Name a better duo. I''ll wait. ☕💻

#Swift #iOS #Xcode', 'https://picsum.photos/seed/post-87-0/600/400', '2026-06-07T04:15:38.423Z', '00000000-0000-4000-a000-000000000057'),
  (259, 'Does anyone else refactor code at 2 AM just because you can''t sleep thinking about a better solution? 😅

#Kotlin #Android #Firebase', NULL, '2026-06-07T03:15:38.423Z', '00000000-0000-4000-a000-000000000057'),
  (260, 'The new MacBook Pro is incredible. The battery life alone is worth the upgrade. 💻

#C# #.NET #Azure', 'https://picsum.photos/seed/post-87-2/600/400', '2026-06-07T02:15:38.423Z', '00000000-0000-4000-a000-000000000057'),
  (261, 'Built a CLI tool today that saves 5 minutes per developer per day. Small wins add up! 🛠️

#Java #Spring #AWS', 'https://picsum.photos/seed/post-87-3/600/400', '2026-06-07T01:15:38.423Z', '00000000-0000-4000-a000-000000000057'),
  (262, 'Finally optimized our database queries. From 5 seconds to 50 milliseconds. Sometimes the simple fixes make the biggest difference. ⚡

#Kotlin #Android #Firebase', NULL, '2026-06-07T00:15:38.423Z', '00000000-0000-4000-a000-000000000058'),
  (263, 'New desk setup is complete! Dual monitors, mechanical keyboard, and way too many plants. 🌿

#C# #.NET #Azure', 'https://picsum.photos/seed/post-88-1/600/400', '2026-06-06T23:15:38.423Z', '00000000-0000-4000-a000-000000000058'),
  (264, 'Throwback to my first hackathon. We built a social media app in 48 hours. Look at us now! 🏆

#C# #.NET #Azure', 'https://picsum.photos/seed/post-89-0/600/400', '2026-06-06T22:15:38.423Z', '00000000-0000-4000-a000-000000000059'),
  (265, 'Just gave a talk at a local meetup about microservices architecture. The Q&A session was incredible! 🎤

#Java #Spring #AWS', 'https://picsum.photos/seed/post-89-1/600/400', '2026-06-06T21:15:38.423Z', '00000000-0000-4000-a000-000000000059'),
  (266, 'Shoutout to my mentor who taught me that clean code is not about perfection, it''s about empathy for the next developer. 🙏

#TypeScript #GraphQL #Prisma', NULL, '2026-06-06T20:15:38.423Z', '00000000-0000-4000-a000-000000000059'),
  (267, 'Great team meeting today. Love working with people who challenge me to be better. 🤝

#Java #Spring #AWS', 'https://picsum.photos/seed/post-90-0/600/400', '2026-06-06T19:15:38.423Z', '00000000-0000-4000-a000-00000000005a'),
  (268, 'Happy Monday! Starting the week with a fresh perspective and a todo list that''s actually realistic. 📋

#TypeScript #GraphQL #Prisma', NULL, '2026-06-06T18:15:38.423Z', '00000000-0000-4000-a000-00000000005a'),
  (269, 'Late night coding session with lofi beats in the background. This is my happy place. 🎧

#React #React Native #Expo', 'https://picsum.photos/seed/post-90-2/600/400', '2026-06-06T17:15:38.423Z', '00000000-0000-4000-a000-00000000005a'),
  (270, 'Trying out a new productivity technique: 25 minutes of focused work, 5 minute breaks. So far so good! ⏱️

#Svelte #SvelteKit #Vite', 'https://picsum.photos/seed/post-90-3/600/400', '2026-06-06T16:15:38.423Z', '00000000-0000-4000-a000-00000000005a'),
  (271, 'Just discovered a new framework and I''m obsessed. This is why I love this industry - there''s always something new to learn! 🔥

#TypeScript #GraphQL #Prisma', NULL, '2026-06-06T15:15:38.423Z', '00000000-0000-4000-a000-00000000005b'),
  (272, 'Migration from REST to GraphQL went smoother than expected. 6 hours of work, zero downtime. 💪

#React #React Native #Expo', 'https://picsum.photos/seed/post-91-1/600/400', '2026-06-06T14:15:38.423Z', '00000000-0000-4000-a000-00000000005b'),
  (273, 'Weekend vibes. Grilling some burgers and enjoying the weather. Life is good. 🍔☀️

#React #React Native #Expo', 'https://picsum.photos/seed/post-92-0/600/400', '2026-06-06T13:15:38.423Z', '00000000-0000-4000-a000-00000000005c'),
  (274, 'Nothing beats the feeling of deploying on a Friday and watching those green checkmarks roll in. ✅

#Svelte #SvelteKit #Vite', 'https://picsum.photos/seed/post-92-1/600/400', '2026-06-06T12:15:38.423Z', '00000000-0000-4000-a000-00000000005c'),
  (275, 'Contemplating life choices while debugging a production issue at 11 PM. Send help. 😂

#Solid.js #TypeScript #Vite', NULL, '2026-06-06T11:15:38.423Z', '00000000-0000-4000-a000-00000000005c');

INSERT INTO public.posts (id, content, img, created_at, user_id) VALUES
  (276, 'Proud moment: my PR just got merged into a major open source project! 🎉

#Svelte #SvelteKit #Vite', 'https://picsum.photos/seed/post-93-0/600/400', '2026-06-06T10:15:38.423Z', '00000000-0000-4000-a000-00000000005d'),
  (277, 'Attended an amazing conference today. So inspired by all the innovative projects people are building. 🌟

#Solid.js #TypeScript #Vite', NULL, '2026-06-06T09:15:38.423Z', '00000000-0000-4000-a000-00000000005d'),
  (278, 'Our team just won the internal hackathon! 48 hours of intense coding, minimal sleep, maximum fun. 🏅

#Next.js #Supabase #Tailwind', 'https://picsum.photos/seed/post-93-2/600/400', '2026-06-06T08:15:38.423Z', '00000000-0000-4000-a000-00000000005d'),
  (279, 'Working from a coffee shop today. Sometimes a change of scenery is all you need. ☕

#Python #Django #PostgreSQL', 'https://picsum.photos/seed/post-93-3/600/400', '2026-06-06T07:15:38.423Z', '00000000-0000-4000-a000-00000000005d'),
  (280, 'Does anyone else refactor code at 2 AM just because you can''t sleep thinking about a better solution? 😅

#Solid.js #TypeScript #Vite', NULL, '2026-06-06T06:15:38.423Z', '00000000-0000-4000-a000-00000000005e'),
  (281, 'The new MacBook Pro is incredible. The battery life alone is worth the upgrade. 💻

#Next.js #Supabase #Tailwind', 'https://picsum.photos/seed/post-94-1/600/400', '2026-06-06T05:15:38.423Z', '00000000-0000-4000-a000-00000000005e'),
  (282, 'New desk setup is complete! Dual monitors, mechanical keyboard, and way too many plants. 🌿

#Next.js #Supabase #Tailwind', 'https://picsum.photos/seed/post-95-0/600/400', '2026-06-06T04:15:38.423Z', '00000000-0000-4000-a000-00000000005f'),
  (283, 'Finally understanding Rust''s borrow checker. It only took me 3 months. 😤

#Python #Django #PostgreSQL', 'https://picsum.photos/seed/post-95-1/600/400', '2026-06-06T03:15:38.423Z', '00000000-0000-4000-a000-00000000005f'),
  (284, 'Imposter syndrome is real, but remember: you got hired for a reason. You belong here. 💪

#PHP #Laravel #MySQL', NULL, '2026-06-06T02:15:38.423Z', '00000000-0000-4000-a000-00000000005f'),
  (285, 'Just gave a talk at a local meetup about microservices architecture. The Q&A session was incredible! 🎤

#Python #Django #PostgreSQL', 'https://picsum.photos/seed/post-96-0/600/400', '2026-06-06T01:15:38.423Z', '00000000-0000-4000-a000-000000000060'),
  (286, 'Shoutout to my mentor who taught me that clean code is not about perfection, it''s about empathy for the next developer. 🙏

#PHP #Laravel #MySQL', NULL, '2026-06-06T00:15:38.423Z', '00000000-0000-4000-a000-000000000060'),
  (287, 'Just wrapped up a massive refactor. The codebase feels 10 years younger. Clean architecture is worth the investment. 🏗️

#Ruby #Rails #Heroku', 'https://picsum.photos/seed/post-96-2/600/400', '2026-06-05T23:15:38.423Z', '00000000-0000-4000-a000-000000000060'),
  (288, 'Pro tip: always write tests BEFORE you refactor. Future you will be grateful. 🧪

#Elixir #Phoenix #PostgreSQL', 'https://picsum.photos/seed/post-96-3/600/400', '2026-06-05T22:15:38.423Z', '00000000-0000-4000-a000-000000000060'),
  (289, 'Happy Monday! Starting the week with a fresh perspective and a todo list that''s actually realistic. 📋

#PHP #Laravel #MySQL', NULL, '2026-06-05T21:15:38.423Z', '00000000-0000-4000-a000-000000000061'),
  (290, 'Late night coding session with lofi beats in the background. This is my happy place. 🎧

#Ruby #Rails #Heroku', 'https://picsum.photos/seed/post-97-1/600/400', '2026-06-05T20:15:38.423Z', '00000000-0000-4000-a000-000000000061'),
  (291, 'Migration from REST to GraphQL went smoother than expected. 6 hours of work, zero downtime. 💪

#Ruby #Rails #Heroku', 'https://picsum.photos/seed/post-98-0/600/400', '2026-06-05T19:15:38.423Z', '00000000-0000-4000-a000-000000000062'),
  (292, 'Just automated a task that used to take me 2 hours every day. That''s 40 hours a month back. 🤯

#Elixir #Phoenix #PostgreSQL', 'https://picsum.photos/seed/post-98-1/600/400', '2026-06-05T18:15:38.423Z', '00000000-0000-4000-a000-000000000062'),
  (293, 'The best code is the code you don''t write. Delete more, ship faster. 🗑️

#Flutter #Dart #Firebase', NULL, '2026-06-05T17:15:38.423Z', '00000000-0000-4000-a000-000000000062'),
  (294, 'Nothing beats the feeling of deploying on a Friday and watching those green checkmarks roll in. ✅

#Elixir #Phoenix #PostgreSQL', 'https://picsum.photos/seed/post-99-0/600/400', '2026-06-05T16:15:38.423Z', '00000000-0000-4000-a000-000000000063'),
  (295, 'Contemplating life choices while debugging a production issue at 11 PM. Send help. 😂

#Flutter #Dart #Firebase', NULL, '2026-06-05T15:15:38.423Z', '00000000-0000-4000-a000-000000000063'),
  (296, 'Nothing like the feeling of solving a bug that''s been haunting you for days. Victory dance! 💃

#TypeScript #React #Node.js', 'https://picsum.photos/seed/post-99-2/600/400', '2026-06-05T14:15:38.423Z', '00000000-0000-4000-a000-000000000063'),
  (297, 'Taking a well-deserved vacation after shipping the biggest project of my career. See you in a week! ✈️

#Python #FastAPI #PostgreSQL', 'https://picsum.photos/seed/post-99-3/600/400', '2026-06-05T13:15:38.423Z', '00000000-0000-4000-a000-000000000063'),
  (298, 'Attended an amazing conference today. So inspired by all the innovative projects people are building. 🌟

#Flutter #Dart #Firebase', NULL, '2026-06-05T12:15:38.423Z', '00000000-0000-4000-a000-000000000064'),
  (299, 'Our team just won the internal hackathon! 48 hours of intense coding, minimal sleep, maximum fun. 🏅

#TypeScript #React #Node.js', 'https://picsum.photos/seed/post-100-1/600/400', '2026-06-05T11:15:38.423Z', '00000000-0000-4000-a000-000000000064');

-- ========== COMENTÁRIOS ==========
INSERT INTO public.comments (id, content, created_at, user_id, post_id) VALUES
  (1, 'This is amazing! Great work! 🔥', '2026-06-07T23:15:38.424Z', '00000000-0000-4000-a000-000000000001', 1),
  (2, 'Love this! Keep it up! 🚀', '2026-06-07T22:15:38.424Z', '00000000-0000-4000-a000-000000000008', 2),
  (3, 'So inspiring! Thanks for sharing! 🙌', '2026-06-07T21:15:38.424Z', '00000000-0000-4000-a000-00000000000f', 3),
  (4, 'Incredible work. You''re killing it! 💪', '2026-06-07T20:15:38.424Z', '00000000-0000-4000-a000-000000000016', 4),
  (5, 'That''s awesome! Can you share how you did it? 🤔', '2026-06-07T19:15:38.424Z', '00000000-0000-4000-a000-00000000001d', 5),
  (6, 'Beautiful! What tools did you use? 🎨', '2026-06-07T18:15:38.424Z', '00000000-0000-4000-a000-000000000024', 6),
  (7, 'Congrats! Well deserved! 🎉', '2026-06-07T17:15:38.424Z', '00000000-0000-4000-a000-00000000002b', 7),
  (8, 'This is exactly what I needed to see today! 💯', '2026-06-07T16:15:38.424Z', '00000000-0000-4000-a000-000000000032', 8),
  (9, 'Great perspective. Thanks for sharing your insights! 👏', '2026-06-07T15:15:38.424Z', '00000000-0000-4000-a000-000000000039', 9),
  (10, 'Wow, just wow. 😮', '2026-06-07T14:15:38.424Z', '00000000-0000-4000-a000-000000000040', 10),
  (11, 'I tried something similar last week. Your approach is much cleaner! 📝', '2026-06-07T13:15:38.424Z', '00000000-0000-4000-a000-000000000047', 11),
  (12, 'This is gold! Saving this for later! ⭐', '2026-06-07T12:15:38.424Z', '00000000-0000-4000-a000-00000000004e', 12),
  (13, 'Love the clean design! 🎯', '2026-06-07T11:15:38.424Z', '00000000-0000-4000-a000-000000000055', 13),
  (14, 'You''re an inspiration to the community! 🌟', '2026-06-07T10:15:38.424Z', '00000000-0000-4000-a000-00000000005c', 14),
  (15, 'Can''t wait to see more of your work! 👀', '2026-06-07T09:15:38.424Z', '00000000-0000-4000-a000-000000000063', 15),
  (16, 'This is amazing! Great work! 🔥', '2026-06-07T08:15:38.424Z', '00000000-0000-4000-a000-000000000006', 16),
  (17, 'Love this! Keep it up! 🚀', '2026-06-07T07:15:38.424Z', '00000000-0000-4000-a000-00000000000d', 17),
  (18, 'So inspiring! Thanks for sharing! 🙌', '2026-06-07T06:15:38.424Z', '00000000-0000-4000-a000-000000000014', 18),
  (19, 'Incredible work. You''re killing it! 💪', '2026-06-07T05:15:38.424Z', '00000000-0000-4000-a000-00000000001b', 19),
  (20, 'That''s awesome! Can you share how you did it? 🤔', '2026-06-07T04:15:38.424Z', '00000000-0000-4000-a000-000000000022', 20),
  (21, 'Beautiful! What tools did you use? 🎨', '2026-06-07T03:15:38.424Z', '00000000-0000-4000-a000-000000000029', 21),
  (22, 'Congrats! Well deserved! 🎉', '2026-06-07T02:15:38.424Z', '00000000-0000-4000-a000-000000000030', 22),
  (23, 'This is exactly what I needed to see today! 💯', '2026-06-07T01:15:38.424Z', '00000000-0000-4000-a000-000000000037', 23),
  (24, 'Great perspective. Thanks for sharing your insights! 👏', '2026-06-07T00:15:38.424Z', '00000000-0000-4000-a000-00000000003e', 24),
  (25, 'Wow, just wow. 😮', '2026-06-06T23:15:38.424Z', '00000000-0000-4000-a000-000000000045', 25),
  (26, 'I tried something similar last week. Your approach is much cleaner! 📝', '2026-06-06T22:15:38.424Z', '00000000-0000-4000-a000-00000000004c', 26),
  (27, 'This is gold! Saving this for later! ⭐', '2026-06-06T21:15:38.424Z', '00000000-0000-4000-a000-000000000053', 27),
  (28, 'Love the clean design! 🎯', '2026-06-06T20:15:38.424Z', '00000000-0000-4000-a000-00000000005a', 28),
  (29, 'You''re an inspiration to the community! 🌟', '2026-06-06T19:15:38.424Z', '00000000-0000-4000-a000-000000000061', 29),
  (30, 'Can''t wait to see more of your work! 👀', '2026-06-06T18:15:38.424Z', '00000000-0000-4000-a000-000000000004', 30),
  (31, 'This is amazing! Great work! 🔥', '2026-06-06T17:15:38.424Z', '00000000-0000-4000-a000-00000000000b', 31),
  (32, 'Love this! Keep it up! 🚀', '2026-06-06T16:15:38.424Z', '00000000-0000-4000-a000-000000000012', 32),
  (33, 'So inspiring! Thanks for sharing! 🙌', '2026-06-06T15:15:38.424Z', '00000000-0000-4000-a000-000000000019', 33),
  (34, 'Incredible work. You''re killing it! 💪', '2026-06-06T14:15:38.424Z', '00000000-0000-4000-a000-000000000020', 34),
  (35, 'That''s awesome! Can you share how you did it? 🤔', '2026-06-06T13:15:38.424Z', '00000000-0000-4000-a000-000000000027', 35),
  (36, 'Beautiful! What tools did you use? 🎨', '2026-06-06T12:15:38.424Z', '00000000-0000-4000-a000-00000000002e', 36),
  (37, 'Congrats! Well deserved! 🎉', '2026-06-06T11:15:38.424Z', '00000000-0000-4000-a000-000000000035', 37),
  (38, 'This is exactly what I needed to see today! 💯', '2026-06-06T10:15:38.424Z', '00000000-0000-4000-a000-00000000003c', 38),
  (39, 'Great perspective. Thanks for sharing your insights! 👏', '2026-06-06T09:15:38.424Z', '00000000-0000-4000-a000-000000000043', 39),
  (40, 'Wow, just wow. 😮', '2026-06-06T08:15:38.424Z', '00000000-0000-4000-a000-00000000004a', 40),
  (41, 'I tried something similar last week. Your approach is much cleaner! 📝', '2026-06-06T07:15:38.424Z', '00000000-0000-4000-a000-000000000051', 41),
  (42, 'This is gold! Saving this for later! ⭐', '2026-06-06T06:15:38.424Z', '00000000-0000-4000-a000-000000000058', 42),
  (43, 'Love the clean design! 🎯', '2026-06-06T05:15:38.424Z', '00000000-0000-4000-a000-00000000005f', 43),
  (44, 'You''re an inspiration to the community! 🌟', '2026-06-06T04:15:38.424Z', '00000000-0000-4000-a000-000000000002', 44),
  (45, 'Can''t wait to see more of your work! 👀', '2026-06-06T03:15:38.424Z', '00000000-0000-4000-a000-000000000009', 45),
  (46, 'This is amazing! Great work! 🔥', '2026-06-06T02:15:38.424Z', '00000000-0000-4000-a000-000000000010', 46),
  (47, 'Love this! Keep it up! 🚀', '2026-06-06T01:15:38.424Z', '00000000-0000-4000-a000-000000000017', 47),
  (48, 'So inspiring! Thanks for sharing! 🙌', '2026-06-06T00:15:38.424Z', '00000000-0000-4000-a000-00000000001e', 48),
  (49, 'Incredible work. You''re killing it! 💪', '2026-06-05T23:15:38.424Z', '00000000-0000-4000-a000-000000000025', 49),
  (50, 'That''s awesome! Can you share how you did it? 🤔', '2026-06-07T23:15:38.424Z', '00000000-0000-4000-a000-00000000002c', 50);

INSERT INTO public.comments (id, content, created_at, user_id, post_id) VALUES
  (51, 'Beautiful! What tools did you use? 🎨', '2026-06-07T22:15:38.424Z', '00000000-0000-4000-a000-000000000033', 51),
  (52, 'Congrats! Well deserved! 🎉', '2026-06-07T21:15:38.424Z', '00000000-0000-4000-a000-00000000003a', 52),
  (53, 'This is exactly what I needed to see today! 💯', '2026-06-07T20:15:38.424Z', '00000000-0000-4000-a000-000000000041', 53),
  (54, 'Great perspective. Thanks for sharing your insights! 👏', '2026-06-07T19:15:38.424Z', '00000000-0000-4000-a000-000000000048', 54),
  (55, 'Wow, just wow. 😮', '2026-06-07T18:15:38.424Z', '00000000-0000-4000-a000-00000000004f', 55),
  (56, 'I tried something similar last week. Your approach is much cleaner! 📝', '2026-06-07T17:15:38.424Z', '00000000-0000-4000-a000-000000000056', 56),
  (57, 'This is gold! Saving this for later! ⭐', '2026-06-07T16:15:38.424Z', '00000000-0000-4000-a000-00000000005d', 57),
  (58, 'Love the clean design! 🎯', '2026-06-07T15:15:38.424Z', '00000000-0000-4000-a000-000000000064', 58),
  (59, 'You''re an inspiration to the community! 🌟', '2026-06-07T14:15:38.424Z', '00000000-0000-4000-a000-000000000007', 59),
  (60, 'Can''t wait to see more of your work! 👀', '2026-06-07T13:15:38.424Z', '00000000-0000-4000-a000-00000000000e', 60),
  (61, 'This is amazing! Great work! 🔥', '2026-06-07T12:15:38.424Z', '00000000-0000-4000-a000-000000000015', 61),
  (62, 'Love this! Keep it up! 🚀', '2026-06-07T11:15:38.424Z', '00000000-0000-4000-a000-00000000001c', 62),
  (63, 'So inspiring! Thanks for sharing! 🙌', '2026-06-07T10:15:38.424Z', '00000000-0000-4000-a000-000000000023', 63),
  (64, 'Incredible work. You''re killing it! 💪', '2026-06-07T09:15:38.424Z', '00000000-0000-4000-a000-00000000002a', 64),
  (65, 'That''s awesome! Can you share how you did it? 🤔', '2026-06-07T08:15:38.424Z', '00000000-0000-4000-a000-000000000031', 65),
  (66, 'Beautiful! What tools did you use? 🎨', '2026-06-07T07:15:38.424Z', '00000000-0000-4000-a000-000000000038', 66),
  (67, 'Congrats! Well deserved! 🎉', '2026-06-07T06:15:38.424Z', '00000000-0000-4000-a000-00000000003f', 67),
  (68, 'This is exactly what I needed to see today! 💯', '2026-06-07T05:15:38.424Z', '00000000-0000-4000-a000-000000000046', 68),
  (69, 'Great perspective. Thanks for sharing your insights! 👏', '2026-06-07T04:15:38.424Z', '00000000-0000-4000-a000-00000000004d', 69),
  (70, 'Wow, just wow. 😮', '2026-06-07T03:15:38.424Z', '00000000-0000-4000-a000-000000000054', 70),
  (71, 'I tried something similar last week. Your approach is much cleaner! 📝', '2026-06-07T02:15:38.424Z', '00000000-0000-4000-a000-00000000005b', 71),
  (72, 'This is gold! Saving this for later! ⭐', '2026-06-07T01:15:38.424Z', '00000000-0000-4000-a000-000000000062', 72),
  (73, 'Love the clean design! 🎯', '2026-06-07T00:15:38.424Z', '00000000-0000-4000-a000-000000000005', 73),
  (74, 'You''re an inspiration to the community! 🌟', '2026-06-06T23:15:38.424Z', '00000000-0000-4000-a000-00000000000c', 74),
  (75, 'Can''t wait to see more of your work! 👀', '2026-06-06T22:15:38.424Z', '00000000-0000-4000-a000-000000000013', 75),
  (76, 'This is amazing! Great work! 🔥', '2026-06-06T21:15:38.424Z', '00000000-0000-4000-a000-00000000001a', 76),
  (77, 'Love this! Keep it up! 🚀', '2026-06-06T20:15:38.424Z', '00000000-0000-4000-a000-000000000021', 77),
  (78, 'So inspiring! Thanks for sharing! 🙌', '2026-06-06T19:15:38.424Z', '00000000-0000-4000-a000-000000000028', 78),
  (79, 'Incredible work. You''re killing it! 💪', '2026-06-06T18:15:38.424Z', '00000000-0000-4000-a000-00000000002f', 79),
  (80, 'That''s awesome! Can you share how you did it? 🤔', '2026-06-06T17:15:38.424Z', '00000000-0000-4000-a000-000000000036', 80),
  (81, 'Beautiful! What tools did you use? 🎨', '2026-06-06T16:15:38.424Z', '00000000-0000-4000-a000-00000000003d', 81),
  (82, 'Congrats! Well deserved! 🎉', '2026-06-06T15:15:38.424Z', '00000000-0000-4000-a000-000000000044', 82),
  (83, 'This is exactly what I needed to see today! 💯', '2026-06-06T14:15:38.424Z', '00000000-0000-4000-a000-00000000004b', 83),
  (84, 'Great perspective. Thanks for sharing your insights! 👏', '2026-06-06T13:15:38.424Z', '00000000-0000-4000-a000-000000000052', 84),
  (85, 'Wow, just wow. 😮', '2026-06-06T12:15:38.424Z', '00000000-0000-4000-a000-000000000059', 85),
  (86, 'I tried something similar last week. Your approach is much cleaner! 📝', '2026-06-06T11:15:38.424Z', '00000000-0000-4000-a000-000000000060', 86),
  (87, 'This is gold! Saving this for later! ⭐', '2026-06-06T10:15:38.424Z', '00000000-0000-4000-a000-000000000003', 87),
  (88, 'Love the clean design! 🎯', '2026-06-06T09:15:38.424Z', '00000000-0000-4000-a000-00000000000a', 88),
  (89, 'You''re an inspiration to the community! 🌟', '2026-06-06T08:15:38.424Z', '00000000-0000-4000-a000-000000000011', 89),
  (90, 'Can''t wait to see more of your work! 👀', '2026-06-06T07:15:38.424Z', '00000000-0000-4000-a000-000000000018', 90),
  (91, 'This is amazing! Great work! 🔥', '2026-06-06T06:15:38.424Z', '00000000-0000-4000-a000-00000000001f', 91),
  (92, 'Love this! Keep it up! 🚀', '2026-06-06T05:15:38.424Z', '00000000-0000-4000-a000-000000000026', 92),
  (93, 'So inspiring! Thanks for sharing! 🙌', '2026-06-06T04:15:38.424Z', '00000000-0000-4000-a000-00000000002d', 93),
  (94, 'Incredible work. You''re killing it! 💪', '2026-06-06T03:15:38.424Z', '00000000-0000-4000-a000-000000000034', 94),
  (95, 'That''s awesome! Can you share how you did it? 🤔', '2026-06-06T02:15:38.424Z', '00000000-0000-4000-a000-00000000003b', 95),
  (96, 'Beautiful! What tools did you use? 🎨', '2026-06-06T01:15:38.424Z', '00000000-0000-4000-a000-000000000042', 96),
  (97, 'Congrats! Well deserved! 🎉', '2026-06-06T00:15:38.424Z', '00000000-0000-4000-a000-000000000049', 97),
  (98, 'This is exactly what I needed to see today! 💯', '2026-06-05T23:15:38.424Z', '00000000-0000-4000-a000-000000000050', 98),
  (99, 'Great perspective. Thanks for sharing your insights! 👏', '2026-06-07T23:15:38.424Z', '00000000-0000-4000-a000-000000000057', 99),
  (100, 'Wow, just wow. 😮', '2026-06-07T22:15:38.424Z', '00000000-0000-4000-a000-00000000005e', 100);

INSERT INTO public.comments (id, content, created_at, user_id, post_id) VALUES
  (101, 'I tried something similar last week. Your approach is much cleaner! 📝', '2026-06-07T21:15:38.424Z', '00000000-0000-4000-a000-000000000001', 101),
  (102, 'This is gold! Saving this for later! ⭐', '2026-06-07T20:15:38.424Z', '00000000-0000-4000-a000-000000000008', 102),
  (103, 'Love the clean design! 🎯', '2026-06-07T19:15:38.424Z', '00000000-0000-4000-a000-00000000000f', 103),
  (104, 'You''re an inspiration to the community! 🌟', '2026-06-07T18:15:38.424Z', '00000000-0000-4000-a000-000000000016', 104),
  (105, 'Can''t wait to see more of your work! 👀', '2026-06-07T17:15:38.424Z', '00000000-0000-4000-a000-00000000001d', 105),
  (106, 'This is amazing! Great work! 🔥', '2026-06-07T16:15:38.424Z', '00000000-0000-4000-a000-000000000024', 106),
  (107, 'Love this! Keep it up! 🚀', '2026-06-07T15:15:38.424Z', '00000000-0000-4000-a000-00000000002b', 107),
  (108, 'So inspiring! Thanks for sharing! 🙌', '2026-06-07T14:15:38.424Z', '00000000-0000-4000-a000-000000000032', 108),
  (109, 'Incredible work. You''re killing it! 💪', '2026-06-07T13:15:38.424Z', '00000000-0000-4000-a000-000000000039', 109),
  (110, 'That''s awesome! Can you share how you did it? 🤔', '2026-06-07T12:15:38.424Z', '00000000-0000-4000-a000-000000000040', 110),
  (111, 'Beautiful! What tools did you use? 🎨', '2026-06-07T11:15:38.424Z', '00000000-0000-4000-a000-000000000047', 111),
  (112, 'Congrats! Well deserved! 🎉', '2026-06-07T10:15:38.424Z', '00000000-0000-4000-a000-00000000004e', 112),
  (113, 'This is exactly what I needed to see today! 💯', '2026-06-07T09:15:38.424Z', '00000000-0000-4000-a000-000000000055', 113),
  (114, 'Great perspective. Thanks for sharing your insights! 👏', '2026-06-07T08:15:38.424Z', '00000000-0000-4000-a000-00000000005c', 114),
  (115, 'Wow, just wow. 😮', '2026-06-07T07:15:38.424Z', '00000000-0000-4000-a000-000000000063', 115),
  (116, 'I tried something similar last week. Your approach is much cleaner! 📝', '2026-06-07T06:15:38.424Z', '00000000-0000-4000-a000-000000000006', 116),
  (117, 'This is gold! Saving this for later! ⭐', '2026-06-07T05:15:38.424Z', '00000000-0000-4000-a000-00000000000d', 117),
  (118, 'Love the clean design! 🎯', '2026-06-07T04:15:38.424Z', '00000000-0000-4000-a000-000000000014', 118),
  (119, 'You''re an inspiration to the community! 🌟', '2026-06-07T03:15:38.424Z', '00000000-0000-4000-a000-00000000001b', 119),
  (120, 'Can''t wait to see more of your work! 👀', '2026-06-07T02:15:38.424Z', '00000000-0000-4000-a000-000000000022', 120),
  (121, 'This is amazing! Great work! 🔥', '2026-06-07T01:15:38.424Z', '00000000-0000-4000-a000-000000000029', 121),
  (122, 'Love this! Keep it up! 🚀', '2026-06-07T00:15:38.424Z', '00000000-0000-4000-a000-000000000030', 122),
  (123, 'So inspiring! Thanks for sharing! 🙌', '2026-06-06T23:15:38.424Z', '00000000-0000-4000-a000-000000000037', 123),
  (124, 'Incredible work. You''re killing it! 💪', '2026-06-06T22:15:38.424Z', '00000000-0000-4000-a000-00000000003e', 124),
  (125, 'That''s awesome! Can you share how you did it? 🤔', '2026-06-06T21:15:38.424Z', '00000000-0000-4000-a000-000000000045', 125),
  (126, 'Beautiful! What tools did you use? 🎨', '2026-06-06T20:15:38.424Z', '00000000-0000-4000-a000-00000000004c', 126),
  (127, 'Congrats! Well deserved! 🎉', '2026-06-06T19:15:38.424Z', '00000000-0000-4000-a000-000000000053', 127),
  (128, 'This is exactly what I needed to see today! 💯', '2026-06-06T18:15:38.424Z', '00000000-0000-4000-a000-00000000005a', 128),
  (129, 'Great perspective. Thanks for sharing your insights! 👏', '2026-06-06T17:15:38.424Z', '00000000-0000-4000-a000-000000000061', 129),
  (130, 'Wow, just wow. 😮', '2026-06-06T16:15:38.424Z', '00000000-0000-4000-a000-000000000004', 130),
  (131, 'I tried something similar last week. Your approach is much cleaner! 📝', '2026-06-06T15:15:38.424Z', '00000000-0000-4000-a000-00000000000b', 131),
  (132, 'This is gold! Saving this for later! ⭐', '2026-06-06T14:15:38.424Z', '00000000-0000-4000-a000-000000000012', 132),
  (133, 'Love the clean design! 🎯', '2026-06-06T13:15:38.424Z', '00000000-0000-4000-a000-000000000019', 133),
  (134, 'You''re an inspiration to the community! 🌟', '2026-06-06T12:15:38.424Z', '00000000-0000-4000-a000-000000000020', 134),
  (135, 'Can''t wait to see more of your work! 👀', '2026-06-06T11:15:38.424Z', '00000000-0000-4000-a000-000000000027', 135),
  (136, 'This is amazing! Great work! 🔥', '2026-06-06T10:15:38.424Z', '00000000-0000-4000-a000-00000000002e', 136),
  (137, 'Love this! Keep it up! 🚀', '2026-06-06T09:15:38.424Z', '00000000-0000-4000-a000-000000000035', 137),
  (138, 'So inspiring! Thanks for sharing! 🙌', '2026-06-06T08:15:38.424Z', '00000000-0000-4000-a000-00000000003c', 138),
  (139, 'Incredible work. You''re killing it! 💪', '2026-06-06T07:15:38.424Z', '00000000-0000-4000-a000-000000000043', 139),
  (140, 'That''s awesome! Can you share how you did it? 🤔', '2026-06-06T06:15:38.424Z', '00000000-0000-4000-a000-00000000004a', 140),
  (141, 'Beautiful! What tools did you use? 🎨', '2026-06-06T05:15:38.424Z', '00000000-0000-4000-a000-000000000051', 141),
  (142, 'Congrats! Well deserved! 🎉', '2026-06-06T04:15:38.424Z', '00000000-0000-4000-a000-000000000058', 142),
  (143, 'This is exactly what I needed to see today! 💯', '2026-06-06T03:15:38.424Z', '00000000-0000-4000-a000-00000000005f', 143),
  (144, 'Great perspective. Thanks for sharing your insights! 👏', '2026-06-06T02:15:38.424Z', '00000000-0000-4000-a000-000000000002', 144),
  (145, 'Wow, just wow. 😮', '2026-06-06T01:15:38.424Z', '00000000-0000-4000-a000-000000000009', 145),
  (146, 'I tried something similar last week. Your approach is much cleaner! 📝', '2026-06-06T00:15:38.424Z', '00000000-0000-4000-a000-000000000010', 146),
  (147, 'This is gold! Saving this for later! ⭐', '2026-06-05T23:15:38.424Z', '00000000-0000-4000-a000-000000000017', 147),
  (148, 'Love the clean design! 🎯', '2026-06-07T23:15:38.424Z', '00000000-0000-4000-a000-00000000001e', 148),
  (149, 'You''re an inspiration to the community! 🌟', '2026-06-07T22:15:38.424Z', '00000000-0000-4000-a000-000000000025', 149),
  (150, 'Can''t wait to see more of your work! 👀', '2026-06-07T21:15:38.424Z', '00000000-0000-4000-a000-00000000002c', 150);

INSERT INTO public.comments (id, content, created_at, user_id, post_id) VALUES
  (151, 'This is amazing! Great work! 🔥', '2026-06-07T20:15:38.424Z', '00000000-0000-4000-a000-000000000033', 151),
  (152, 'Love this! Keep it up! 🚀', '2026-06-07T19:15:38.424Z', '00000000-0000-4000-a000-00000000003a', 152),
  (153, 'So inspiring! Thanks for sharing! 🙌', '2026-06-07T18:15:38.424Z', '00000000-0000-4000-a000-000000000041', 153),
  (154, 'Incredible work. You''re killing it! 💪', '2026-06-07T17:15:38.424Z', '00000000-0000-4000-a000-000000000048', 154),
  (155, 'That''s awesome! Can you share how you did it? 🤔', '2026-06-07T16:15:38.424Z', '00000000-0000-4000-a000-00000000004f', 155),
  (156, 'Beautiful! What tools did you use? 🎨', '2026-06-07T15:15:38.424Z', '00000000-0000-4000-a000-000000000056', 156),
  (157, 'Congrats! Well deserved! 🎉', '2026-06-07T14:15:38.424Z', '00000000-0000-4000-a000-00000000005d', 157),
  (158, 'This is exactly what I needed to see today! 💯', '2026-06-07T13:15:38.424Z', '00000000-0000-4000-a000-000000000064', 158),
  (159, 'Great perspective. Thanks for sharing your insights! 👏', '2026-06-07T12:15:38.424Z', '00000000-0000-4000-a000-000000000007', 159),
  (160, 'Wow, just wow. 😮', '2026-06-07T11:15:38.424Z', '00000000-0000-4000-a000-00000000000e', 160),
  (161, 'I tried something similar last week. Your approach is much cleaner! 📝', '2026-06-07T10:15:38.424Z', '00000000-0000-4000-a000-000000000015', 161),
  (162, 'This is gold! Saving this for later! ⭐', '2026-06-07T09:15:38.424Z', '00000000-0000-4000-a000-00000000001c', 162),
  (163, 'Love the clean design! 🎯', '2026-06-07T08:15:38.424Z', '00000000-0000-4000-a000-000000000023', 163),
  (164, 'You''re an inspiration to the community! 🌟', '2026-06-07T07:15:38.424Z', '00000000-0000-4000-a000-00000000002a', 164),
  (165, 'Can''t wait to see more of your work! 👀', '2026-06-07T06:15:38.424Z', '00000000-0000-4000-a000-000000000031', 165),
  (166, 'This is amazing! Great work! 🔥', '2026-06-07T05:15:38.424Z', '00000000-0000-4000-a000-000000000038', 166),
  (167, 'Love this! Keep it up! 🚀', '2026-06-07T04:15:38.424Z', '00000000-0000-4000-a000-00000000003f', 167),
  (168, 'So inspiring! Thanks for sharing! 🙌', '2026-06-07T03:15:38.424Z', '00000000-0000-4000-a000-000000000046', 168),
  (169, 'Incredible work. You''re killing it! 💪', '2026-06-07T02:15:38.424Z', '00000000-0000-4000-a000-00000000004d', 169),
  (170, 'That''s awesome! Can you share how you did it? 🤔', '2026-06-07T01:15:38.424Z', '00000000-0000-4000-a000-000000000054', 170),
  (171, 'Beautiful! What tools did you use? 🎨', '2026-06-07T00:15:38.424Z', '00000000-0000-4000-a000-00000000005b', 171),
  (172, 'Congrats! Well deserved! 🎉', '2026-06-06T23:15:38.424Z', '00000000-0000-4000-a000-000000000062', 172),
  (173, 'This is exactly what I needed to see today! 💯', '2026-06-06T22:15:38.424Z', '00000000-0000-4000-a000-000000000005', 173),
  (174, 'Great perspective. Thanks for sharing your insights! 👏', '2026-06-06T21:15:38.424Z', '00000000-0000-4000-a000-00000000000c', 174),
  (175, 'Wow, just wow. 😮', '2026-06-06T20:15:38.424Z', '00000000-0000-4000-a000-000000000013', 175),
  (176, 'I tried something similar last week. Your approach is much cleaner! 📝', '2026-06-06T19:15:38.424Z', '00000000-0000-4000-a000-00000000001a', 176),
  (177, 'This is gold! Saving this for later! ⭐', '2026-06-06T18:15:38.424Z', '00000000-0000-4000-a000-000000000021', 177),
  (178, 'Love the clean design! 🎯', '2026-06-06T17:15:38.425Z', '00000000-0000-4000-a000-000000000028', 178),
  (179, 'You''re an inspiration to the community! 🌟', '2026-06-06T16:15:38.425Z', '00000000-0000-4000-a000-00000000002f', 179),
  (180, 'Can''t wait to see more of your work! 👀', '2026-06-06T15:15:38.425Z', '00000000-0000-4000-a000-000000000036', 180),
  (181, 'This is amazing! Great work! 🔥', '2026-06-06T14:15:38.425Z', '00000000-0000-4000-a000-00000000003d', 181),
  (182, 'Love this! Keep it up! 🚀', '2026-06-06T13:15:38.425Z', '00000000-0000-4000-a000-000000000044', 182),
  (183, 'So inspiring! Thanks for sharing! 🙌', '2026-06-06T12:15:38.425Z', '00000000-0000-4000-a000-00000000004b', 183),
  (184, 'Incredible work. You''re killing it! 💪', '2026-06-06T11:15:38.425Z', '00000000-0000-4000-a000-000000000052', 184),
  (185, 'That''s awesome! Can you share how you did it? 🤔', '2026-06-06T10:15:38.425Z', '00000000-0000-4000-a000-000000000059', 185),
  (186, 'Beautiful! What tools did you use? 🎨', '2026-06-06T09:15:38.425Z', '00000000-0000-4000-a000-000000000060', 186),
  (187, 'Congrats! Well deserved! 🎉', '2026-06-06T08:15:38.425Z', '00000000-0000-4000-a000-000000000003', 187),
  (188, 'This is exactly what I needed to see today! 💯', '2026-06-06T07:15:38.425Z', '00000000-0000-4000-a000-00000000000a', 188),
  (189, 'Great perspective. Thanks for sharing your insights! 👏', '2026-06-06T06:15:38.425Z', '00000000-0000-4000-a000-000000000011', 189),
  (190, 'Wow, just wow. 😮', '2026-06-06T05:15:38.425Z', '00000000-0000-4000-a000-000000000018', 190),
  (191, 'I tried something similar last week. Your approach is much cleaner! 📝', '2026-06-06T04:15:38.425Z', '00000000-0000-4000-a000-00000000001f', 191),
  (192, 'This is gold! Saving this for later! ⭐', '2026-06-06T03:15:38.425Z', '00000000-0000-4000-a000-000000000026', 192),
  (193, 'Love the clean design! 🎯', '2026-06-06T02:15:38.425Z', '00000000-0000-4000-a000-00000000002d', 193),
  (194, 'You''re an inspiration to the community! 🌟', '2026-06-06T01:15:38.425Z', '00000000-0000-4000-a000-000000000034', 194),
  (195, 'Can''t wait to see more of your work! 👀', '2026-06-06T00:15:38.425Z', '00000000-0000-4000-a000-00000000003b', 195),
  (196, 'This is amazing! Great work! 🔥', '2026-06-05T23:15:38.425Z', '00000000-0000-4000-a000-000000000042', 196),
  (197, 'Love this! Keep it up! 🚀', '2026-06-07T23:15:38.425Z', '00000000-0000-4000-a000-000000000049', 197),
  (198, 'So inspiring! Thanks for sharing! 🙌', '2026-06-07T22:15:38.425Z', '00000000-0000-4000-a000-000000000050', 198),
  (199, 'Incredible work. You''re killing it! 💪', '2026-06-07T21:15:38.425Z', '00000000-0000-4000-a000-000000000057', 199),
  (200, 'That''s awesome! Can you share how you did it? 🤔', '2026-06-07T20:15:38.425Z', '00000000-0000-4000-a000-00000000005e', 200);

-- ========== LIKES ==========
INSERT INTO public.likes (id, created_at, user_id, post_id) VALUES
  (1, '2026-06-07T23:15:38.425Z', '00000000-0000-4000-a000-000000000001', 1),
  (2, '2026-06-07T22:15:38.425Z', '00000000-0000-4000-a000-00000000000e', 2),
  (3, '2026-06-07T21:15:38.425Z', '00000000-0000-4000-a000-00000000001b', 3),
  (4, '2026-06-07T20:15:38.425Z', '00000000-0000-4000-a000-000000000028', 4),
  (5, '2026-06-07T19:15:38.425Z', '00000000-0000-4000-a000-000000000035', 5),
  (6, '2026-06-07T18:15:38.425Z', '00000000-0000-4000-a000-000000000042', 6),
  (7, '2026-06-07T17:15:38.425Z', '00000000-0000-4000-a000-00000000004f', 7),
  (8, '2026-06-07T16:15:38.425Z', '00000000-0000-4000-a000-00000000005c', 8),
  (9, '2026-06-07T15:15:38.425Z', '00000000-0000-4000-a000-000000000005', 9),
  (10, '2026-06-07T14:15:38.425Z', '00000000-0000-4000-a000-000000000012', 10),
  (11, '2026-06-07T13:15:38.425Z', '00000000-0000-4000-a000-00000000001f', 11),
  (12, '2026-06-07T12:15:38.425Z', '00000000-0000-4000-a000-00000000002c', 12),
  (13, '2026-06-07T11:15:38.425Z', '00000000-0000-4000-a000-000000000039', 13),
  (14, '2026-06-07T10:15:38.425Z', '00000000-0000-4000-a000-000000000046', 14),
  (15, '2026-06-07T09:15:38.425Z', '00000000-0000-4000-a000-000000000053', 15),
  (16, '2026-06-07T08:15:38.425Z', '00000000-0000-4000-a000-000000000060', 16),
  (17, '2026-06-07T07:15:38.425Z', '00000000-0000-4000-a000-000000000009', 17),
  (18, '2026-06-07T06:15:38.425Z', '00000000-0000-4000-a000-000000000016', 18),
  (19, '2026-06-07T05:15:38.425Z', '00000000-0000-4000-a000-000000000023', 19),
  (20, '2026-06-07T04:15:38.425Z', '00000000-0000-4000-a000-000000000030', 20),
  (21, '2026-06-07T03:15:38.425Z', '00000000-0000-4000-a000-00000000003d', 21),
  (22, '2026-06-07T02:15:38.425Z', '00000000-0000-4000-a000-00000000004a', 22),
  (23, '2026-06-07T01:15:38.425Z', '00000000-0000-4000-a000-000000000057', 23),
  (24, '2026-06-07T00:15:38.425Z', '00000000-0000-4000-a000-000000000064', 24),
  (25, '2026-06-06T23:15:38.425Z', '00000000-0000-4000-a000-00000000000d', 25),
  (26, '2026-06-06T22:15:38.425Z', '00000000-0000-4000-a000-00000000001a', 26),
  (27, '2026-06-06T21:15:38.425Z', '00000000-0000-4000-a000-000000000027', 27),
  (28, '2026-06-06T20:15:38.425Z', '00000000-0000-4000-a000-000000000034', 28),
  (29, '2026-06-06T19:15:38.425Z', '00000000-0000-4000-a000-000000000041', 29),
  (30, '2026-06-06T18:15:38.425Z', '00000000-0000-4000-a000-00000000004e', 30),
  (31, '2026-06-06T17:15:38.425Z', '00000000-0000-4000-a000-00000000005b', 31),
  (32, '2026-06-06T16:15:38.425Z', '00000000-0000-4000-a000-000000000004', 32),
  (33, '2026-06-06T15:15:38.425Z', '00000000-0000-4000-a000-000000000011', 33),
  (34, '2026-06-06T14:15:38.425Z', '00000000-0000-4000-a000-00000000001e', 34),
  (35, '2026-06-06T13:15:38.425Z', '00000000-0000-4000-a000-00000000002b', 35),
  (36, '2026-06-06T12:15:38.425Z', '00000000-0000-4000-a000-000000000038', 36),
  (37, '2026-06-06T11:15:38.425Z', '00000000-0000-4000-a000-000000000045', 37),
  (38, '2026-06-06T10:15:38.425Z', '00000000-0000-4000-a000-000000000052', 38),
  (39, '2026-06-06T09:15:38.425Z', '00000000-0000-4000-a000-00000000005f', 39),
  (40, '2026-06-06T08:15:38.425Z', '00000000-0000-4000-a000-000000000008', 40),
  (41, '2026-06-06T07:15:38.425Z', '00000000-0000-4000-a000-000000000015', 41),
  (42, '2026-06-06T06:15:38.425Z', '00000000-0000-4000-a000-000000000022', 42),
  (43, '2026-06-06T05:15:38.425Z', '00000000-0000-4000-a000-00000000002f', 43),
  (44, '2026-06-06T04:15:38.425Z', '00000000-0000-4000-a000-00000000003c', 44),
  (45, '2026-06-06T03:15:38.425Z', '00000000-0000-4000-a000-000000000049', 45),
  (46, '2026-06-06T02:15:38.425Z', '00000000-0000-4000-a000-000000000056', 46),
  (47, '2026-06-06T01:15:38.425Z', '00000000-0000-4000-a000-000000000063', 47),
  (48, '2026-06-06T00:15:38.425Z', '00000000-0000-4000-a000-00000000000c', 48),
  (49, '2026-06-05T23:15:38.425Z', '00000000-0000-4000-a000-000000000019', 49),
  (50, '2026-06-05T22:15:38.425Z', '00000000-0000-4000-a000-000000000026', 50);

INSERT INTO public.likes (id, created_at, user_id, post_id) VALUES
  (51, '2026-06-05T21:15:38.425Z', '00000000-0000-4000-a000-000000000033', 51),
  (52, '2026-06-05T20:15:38.425Z', '00000000-0000-4000-a000-000000000040', 52),
  (53, '2026-06-05T19:15:38.425Z', '00000000-0000-4000-a000-00000000004d', 53),
  (54, '2026-06-05T18:15:38.425Z', '00000000-0000-4000-a000-00000000005a', 54),
  (55, '2026-06-05T17:15:38.425Z', '00000000-0000-4000-a000-000000000003', 55),
  (56, '2026-06-05T16:15:38.425Z', '00000000-0000-4000-a000-000000000010', 56),
  (57, '2026-06-05T15:15:38.425Z', '00000000-0000-4000-a000-00000000001d', 57),
  (58, '2026-06-05T14:15:38.425Z', '00000000-0000-4000-a000-00000000002a', 58),
  (59, '2026-06-05T13:15:38.425Z', '00000000-0000-4000-a000-000000000037', 59),
  (60, '2026-06-05T12:15:38.425Z', '00000000-0000-4000-a000-000000000044', 60),
  (61, '2026-06-05T11:15:38.425Z', '00000000-0000-4000-a000-000000000051', 61),
  (62, '2026-06-05T10:15:38.425Z', '00000000-0000-4000-a000-00000000005e', 62),
  (63, '2026-06-05T09:15:38.425Z', '00000000-0000-4000-a000-000000000007', 63),
  (64, '2026-06-05T08:15:38.425Z', '00000000-0000-4000-a000-000000000014', 64),
  (65, '2026-06-05T07:15:38.425Z', '00000000-0000-4000-a000-000000000021', 65),
  (66, '2026-06-05T06:15:38.425Z', '00000000-0000-4000-a000-00000000002e', 66),
  (67, '2026-06-05T05:15:38.425Z', '00000000-0000-4000-a000-00000000003b', 67),
  (68, '2026-06-05T04:15:38.425Z', '00000000-0000-4000-a000-000000000048', 68),
  (69, '2026-06-05T03:15:38.425Z', '00000000-0000-4000-a000-000000000055', 69),
  (70, '2026-06-05T02:15:38.425Z', '00000000-0000-4000-a000-000000000062', 70),
  (71, '2026-06-05T01:15:38.425Z', '00000000-0000-4000-a000-00000000000b', 71),
  (72, '2026-06-05T00:15:38.425Z', '00000000-0000-4000-a000-000000000018', 72),
  (73, '2026-06-04T23:15:38.425Z', '00000000-0000-4000-a000-000000000025', 73),
  (74, '2026-06-07T23:15:38.425Z', '00000000-0000-4000-a000-000000000032', 74),
  (75, '2026-06-07T22:15:38.425Z', '00000000-0000-4000-a000-00000000003f', 75),
  (76, '2026-06-07T21:15:38.425Z', '00000000-0000-4000-a000-00000000004c', 76),
  (77, '2026-06-07T20:15:38.425Z', '00000000-0000-4000-a000-000000000059', 77),
  (78, '2026-06-07T19:15:38.425Z', '00000000-0000-4000-a000-000000000002', 78),
  (79, '2026-06-07T18:15:38.425Z', '00000000-0000-4000-a000-00000000000f', 79),
  (80, '2026-06-07T17:15:38.425Z', '00000000-0000-4000-a000-00000000001c', 80),
  (81, '2026-06-07T16:15:38.425Z', '00000000-0000-4000-a000-000000000029', 81),
  (82, '2026-06-07T15:15:38.425Z', '00000000-0000-4000-a000-000000000036', 82),
  (83, '2026-06-07T14:15:38.425Z', '00000000-0000-4000-a000-000000000043', 83),
  (84, '2026-06-07T13:15:38.425Z', '00000000-0000-4000-a000-000000000050', 84),
  (85, '2026-06-07T12:15:38.425Z', '00000000-0000-4000-a000-00000000005d', 85),
  (86, '2026-06-07T11:15:38.425Z', '00000000-0000-4000-a000-000000000006', 86),
  (87, '2026-06-07T10:15:38.425Z', '00000000-0000-4000-a000-000000000013', 87),
  (88, '2026-06-07T09:15:38.425Z', '00000000-0000-4000-a000-000000000020', 88),
  (89, '2026-06-07T08:15:38.425Z', '00000000-0000-4000-a000-00000000002d', 89),
  (90, '2026-06-07T07:15:38.425Z', '00000000-0000-4000-a000-00000000003a', 90),
  (91, '2026-06-07T06:15:38.425Z', '00000000-0000-4000-a000-000000000047', 91),
  (92, '2026-06-07T05:15:38.425Z', '00000000-0000-4000-a000-000000000054', 92),
  (93, '2026-06-07T04:15:38.425Z', '00000000-0000-4000-a000-000000000061', 93),
  (94, '2026-06-07T03:15:38.425Z', '00000000-0000-4000-a000-00000000000a', 94),
  (95, '2026-06-07T02:15:38.425Z', '00000000-0000-4000-a000-000000000017', 95),
  (96, '2026-06-07T01:15:38.425Z', '00000000-0000-4000-a000-000000000024', 96),
  (97, '2026-06-07T00:15:38.425Z', '00000000-0000-4000-a000-000000000031', 97),
  (98, '2026-06-06T23:15:38.425Z', '00000000-0000-4000-a000-00000000003e', 98),
  (99, '2026-06-06T22:15:38.425Z', '00000000-0000-4000-a000-00000000004b', 99),
  (100, '2026-06-06T21:15:38.425Z', '00000000-0000-4000-a000-000000000058', 100);

INSERT INTO public.likes (id, created_at, user_id, post_id) VALUES
  (101, '2026-06-06T20:15:38.425Z', '00000000-0000-4000-a000-000000000001', 101),
  (102, '2026-06-06T19:15:38.425Z', '00000000-0000-4000-a000-00000000000e', 102),
  (103, '2026-06-06T18:15:38.425Z', '00000000-0000-4000-a000-00000000001b', 103),
  (104, '2026-06-06T17:15:38.425Z', '00000000-0000-4000-a000-000000000028', 104),
  (105, '2026-06-06T16:15:38.425Z', '00000000-0000-4000-a000-000000000035', 105),
  (106, '2026-06-06T15:15:38.425Z', '00000000-0000-4000-a000-000000000042', 106),
  (107, '2026-06-06T14:15:38.425Z', '00000000-0000-4000-a000-00000000004f', 107),
  (108, '2026-06-06T13:15:38.425Z', '00000000-0000-4000-a000-00000000005c', 108),
  (109, '2026-06-06T12:15:38.425Z', '00000000-0000-4000-a000-000000000005', 109),
  (110, '2026-06-06T11:15:38.425Z', '00000000-0000-4000-a000-000000000012', 110),
  (111, '2026-06-06T10:15:38.425Z', '00000000-0000-4000-a000-00000000001f', 111),
  (112, '2026-06-06T09:15:38.425Z', '00000000-0000-4000-a000-00000000002c', 112),
  (113, '2026-06-06T08:15:38.425Z', '00000000-0000-4000-a000-000000000039', 113),
  (114, '2026-06-06T07:15:38.425Z', '00000000-0000-4000-a000-000000000046', 114),
  (115, '2026-06-06T06:15:38.425Z', '00000000-0000-4000-a000-000000000053', 115),
  (116, '2026-06-06T05:15:38.425Z', '00000000-0000-4000-a000-000000000060', 116),
  (117, '2026-06-06T04:15:38.425Z', '00000000-0000-4000-a000-000000000009', 117),
  (118, '2026-06-06T03:15:38.425Z', '00000000-0000-4000-a000-000000000016', 118),
  (119, '2026-06-06T02:15:38.425Z', '00000000-0000-4000-a000-000000000023', 119),
  (120, '2026-06-06T01:15:38.425Z', '00000000-0000-4000-a000-000000000030', 120),
  (121, '2026-06-06T00:15:38.425Z', '00000000-0000-4000-a000-00000000003d', 121),
  (122, '2026-06-05T23:15:38.425Z', '00000000-0000-4000-a000-00000000004a', 122),
  (123, '2026-06-05T22:15:38.425Z', '00000000-0000-4000-a000-000000000057', 123),
  (124, '2026-06-05T21:15:38.425Z', '00000000-0000-4000-a000-000000000064', 124),
  (125, '2026-06-05T20:15:38.425Z', '00000000-0000-4000-a000-00000000000d', 125),
  (126, '2026-06-05T19:15:38.425Z', '00000000-0000-4000-a000-00000000001a', 126),
  (127, '2026-06-05T18:15:38.425Z', '00000000-0000-4000-a000-000000000027', 127),
  (128, '2026-06-05T17:15:38.425Z', '00000000-0000-4000-a000-000000000034', 128),
  (129, '2026-06-05T16:15:38.425Z', '00000000-0000-4000-a000-000000000041', 129),
  (130, '2026-06-05T15:15:38.425Z', '00000000-0000-4000-a000-00000000004e', 130),
  (131, '2026-06-05T14:15:38.425Z', '00000000-0000-4000-a000-00000000005b', 131),
  (132, '2026-06-05T13:15:38.425Z', '00000000-0000-4000-a000-000000000004', 132),
  (133, '2026-06-05T12:15:38.425Z', '00000000-0000-4000-a000-000000000011', 133),
  (134, '2026-06-05T11:15:38.425Z', '00000000-0000-4000-a000-00000000001e', 134),
  (135, '2026-06-05T10:15:38.425Z', '00000000-0000-4000-a000-00000000002b', 135),
  (136, '2026-06-05T09:15:38.425Z', '00000000-0000-4000-a000-000000000038', 136),
  (137, '2026-06-05T08:15:38.425Z', '00000000-0000-4000-a000-000000000045', 137),
  (138, '2026-06-05T07:15:38.425Z', '00000000-0000-4000-a000-000000000052', 138),
  (139, '2026-06-05T06:15:38.425Z', '00000000-0000-4000-a000-00000000005f', 139),
  (140, '2026-06-05T05:15:38.425Z', '00000000-0000-4000-a000-000000000008', 140),
  (141, '2026-06-05T04:15:38.425Z', '00000000-0000-4000-a000-000000000015', 141),
  (142, '2026-06-05T03:15:38.425Z', '00000000-0000-4000-a000-000000000022', 142),
  (143, '2026-06-05T02:15:38.425Z', '00000000-0000-4000-a000-00000000002f', 143),
  (144, '2026-06-05T01:15:38.425Z', '00000000-0000-4000-a000-00000000003c', 144),
  (145, '2026-06-05T00:15:38.425Z', '00000000-0000-4000-a000-000000000049', 145),
  (146, '2026-06-04T23:15:38.425Z', '00000000-0000-4000-a000-000000000056', 146),
  (147, '2026-06-07T23:15:38.425Z', '00000000-0000-4000-a000-000000000063', 147),
  (148, '2026-06-07T22:15:38.425Z', '00000000-0000-4000-a000-00000000000c', 148),
  (149, '2026-06-07T21:15:38.425Z', '00000000-0000-4000-a000-000000000019', 149),
  (150, '2026-06-07T20:15:38.425Z', '00000000-0000-4000-a000-000000000026', 150);

INSERT INTO public.likes (id, created_at, user_id, post_id) VALUES
  (151, '2026-06-07T19:15:38.425Z', '00000000-0000-4000-a000-000000000033', 151),
  (152, '2026-06-07T18:15:38.425Z', '00000000-0000-4000-a000-000000000040', 152),
  (153, '2026-06-07T17:15:38.425Z', '00000000-0000-4000-a000-00000000004d', 153),
  (154, '2026-06-07T16:15:38.425Z', '00000000-0000-4000-a000-00000000005a', 154),
  (155, '2026-06-07T15:15:38.425Z', '00000000-0000-4000-a000-000000000003', 155),
  (156, '2026-06-07T14:15:38.425Z', '00000000-0000-4000-a000-000000000010', 156),
  (157, '2026-06-07T13:15:38.425Z', '00000000-0000-4000-a000-00000000001d', 157),
  (158, '2026-06-07T12:15:38.425Z', '00000000-0000-4000-a000-00000000002a', 158),
  (159, '2026-06-07T11:15:38.425Z', '00000000-0000-4000-a000-000000000037', 159),
  (160, '2026-06-07T10:15:38.425Z', '00000000-0000-4000-a000-000000000044', 160),
  (161, '2026-06-07T09:15:38.425Z', '00000000-0000-4000-a000-000000000051', 161),
  (162, '2026-06-07T08:15:38.425Z', '00000000-0000-4000-a000-00000000005e', 162),
  (163, '2026-06-07T07:15:38.425Z', '00000000-0000-4000-a000-000000000007', 163),
  (164, '2026-06-07T06:15:38.425Z', '00000000-0000-4000-a000-000000000014', 164),
  (165, '2026-06-07T05:15:38.425Z', '00000000-0000-4000-a000-000000000021', 165),
  (166, '2026-06-07T04:15:38.425Z', '00000000-0000-4000-a000-00000000002e', 166),
  (167, '2026-06-07T03:15:38.425Z', '00000000-0000-4000-a000-00000000003b', 167),
  (168, '2026-06-07T02:15:38.425Z', '00000000-0000-4000-a000-000000000048', 168),
  (169, '2026-06-07T01:15:38.425Z', '00000000-0000-4000-a000-000000000055', 169),
  (170, '2026-06-07T00:15:38.425Z', '00000000-0000-4000-a000-000000000062', 170),
  (171, '2026-06-06T23:15:38.425Z', '00000000-0000-4000-a000-00000000000b', 171),
  (172, '2026-06-06T22:15:38.425Z', '00000000-0000-4000-a000-000000000018', 172),
  (173, '2026-06-06T21:15:38.425Z', '00000000-0000-4000-a000-000000000025', 173),
  (174, '2026-06-06T20:15:38.425Z', '00000000-0000-4000-a000-000000000032', 174),
  (175, '2026-06-06T19:15:38.425Z', '00000000-0000-4000-a000-00000000003f', 175),
  (176, '2026-06-06T18:15:38.425Z', '00000000-0000-4000-a000-00000000004c', 176),
  (177, '2026-06-06T17:15:38.425Z', '00000000-0000-4000-a000-000000000059', 177),
  (178, '2026-06-06T16:15:38.425Z', '00000000-0000-4000-a000-000000000002', 178),
  (179, '2026-06-06T15:15:38.425Z', '00000000-0000-4000-a000-00000000000f', 179),
  (180, '2026-06-06T14:15:38.425Z', '00000000-0000-4000-a000-00000000001c', 180),
  (181, '2026-06-06T13:15:38.425Z', '00000000-0000-4000-a000-000000000029', 181),
  (182, '2026-06-06T12:15:38.425Z', '00000000-0000-4000-a000-000000000036', 182),
  (183, '2026-06-06T11:15:38.425Z', '00000000-0000-4000-a000-000000000043', 183),
  (184, '2026-06-06T10:15:38.425Z', '00000000-0000-4000-a000-000000000050', 184),
  (185, '2026-06-06T09:15:38.425Z', '00000000-0000-4000-a000-00000000005d', 185),
  (186, '2026-06-06T08:15:38.425Z', '00000000-0000-4000-a000-000000000006', 186),
  (187, '2026-06-06T07:15:38.425Z', '00000000-0000-4000-a000-000000000013', 187),
  (188, '2026-06-06T06:15:38.425Z', '00000000-0000-4000-a000-000000000020', 188),
  (189, '2026-06-06T05:15:38.425Z', '00000000-0000-4000-a000-00000000002d', 189),
  (190, '2026-06-06T04:15:38.425Z', '00000000-0000-4000-a000-00000000003a', 190),
  (191, '2026-06-06T03:15:38.425Z', '00000000-0000-4000-a000-000000000047', 191),
  (192, '2026-06-06T02:15:38.425Z', '00000000-0000-4000-a000-000000000054', 192),
  (193, '2026-06-06T01:15:38.425Z', '00000000-0000-4000-a000-000000000061', 193),
  (194, '2026-06-06T00:15:38.425Z', '00000000-0000-4000-a000-00000000000a', 194),
  (195, '2026-06-05T23:15:38.425Z', '00000000-0000-4000-a000-000000000017', 195),
  (196, '2026-06-05T22:15:38.425Z', '00000000-0000-4000-a000-000000000024', 196),
  (197, '2026-06-05T21:15:38.425Z', '00000000-0000-4000-a000-000000000031', 197),
  (198, '2026-06-05T20:15:38.425Z', '00000000-0000-4000-a000-00000000003e', 198),
  (199, '2026-06-05T19:15:38.425Z', '00000000-0000-4000-a000-00000000004b', 199),
  (200, '2026-06-05T18:15:38.425Z', '00000000-0000-4000-a000-000000000058', 200);

INSERT INTO public.likes (id, created_at, user_id, post_id) VALUES
  (201, '2026-06-05T17:15:38.425Z', '00000000-0000-4000-a000-000000000001', 201),
  (202, '2026-06-05T16:15:38.425Z', '00000000-0000-4000-a000-00000000000e', 202),
  (203, '2026-06-05T15:15:38.425Z', '00000000-0000-4000-a000-00000000001b', 203),
  (204, '2026-06-05T14:15:38.425Z', '00000000-0000-4000-a000-000000000028', 204),
  (205, '2026-06-05T13:15:38.425Z', '00000000-0000-4000-a000-000000000035', 205),
  (206, '2026-06-05T12:15:38.425Z', '00000000-0000-4000-a000-000000000042', 206),
  (207, '2026-06-05T11:15:38.425Z', '00000000-0000-4000-a000-00000000004f', 207),
  (208, '2026-06-05T10:15:38.425Z', '00000000-0000-4000-a000-00000000005c', 208),
  (209, '2026-06-05T09:15:38.425Z', '00000000-0000-4000-a000-000000000005', 209),
  (210, '2026-06-05T08:15:38.425Z', '00000000-0000-4000-a000-000000000012', 210),
  (211, '2026-06-05T07:15:38.425Z', '00000000-0000-4000-a000-00000000001f', 211),
  (212, '2026-06-05T06:15:38.425Z', '00000000-0000-4000-a000-00000000002c', 212),
  (213, '2026-06-05T05:15:38.425Z', '00000000-0000-4000-a000-000000000039', 213),
  (214, '2026-06-05T04:15:38.425Z', '00000000-0000-4000-a000-000000000046', 214),
  (215, '2026-06-05T03:15:38.426Z', '00000000-0000-4000-a000-000000000053', 215),
  (216, '2026-06-05T02:15:38.426Z', '00000000-0000-4000-a000-000000000060', 216),
  (217, '2026-06-05T01:15:38.426Z', '00000000-0000-4000-a000-000000000009', 217),
  (218, '2026-06-05T00:15:38.426Z', '00000000-0000-4000-a000-000000000016', 218),
  (219, '2026-06-04T23:15:38.426Z', '00000000-0000-4000-a000-000000000023', 219),
  (220, '2026-06-07T23:15:38.426Z', '00000000-0000-4000-a000-000000000030', 220),
  (221, '2026-06-07T22:15:38.426Z', '00000000-0000-4000-a000-00000000003d', 221),
  (222, '2026-06-07T21:15:38.426Z', '00000000-0000-4000-a000-00000000004a', 222),
  (223, '2026-06-07T20:15:38.426Z', '00000000-0000-4000-a000-000000000057', 223),
  (224, '2026-06-07T19:15:38.426Z', '00000000-0000-4000-a000-000000000064', 224),
  (225, '2026-06-07T18:15:38.426Z', '00000000-0000-4000-a000-00000000000d', 225),
  (226, '2026-06-07T17:15:38.426Z', '00000000-0000-4000-a000-00000000001a', 226),
  (227, '2026-06-07T16:15:38.426Z', '00000000-0000-4000-a000-000000000027', 227),
  (228, '2026-06-07T15:15:38.426Z', '00000000-0000-4000-a000-000000000034', 228),
  (229, '2026-06-07T14:15:38.426Z', '00000000-0000-4000-a000-000000000041', 229),
  (230, '2026-06-07T13:15:38.426Z', '00000000-0000-4000-a000-00000000004e', 230),
  (231, '2026-06-07T12:15:38.426Z', '00000000-0000-4000-a000-00000000005b', 231),
  (232, '2026-06-07T11:15:38.426Z', '00000000-0000-4000-a000-000000000004', 232),
  (233, '2026-06-07T10:15:38.426Z', '00000000-0000-4000-a000-000000000011', 233),
  (234, '2026-06-07T09:15:38.426Z', '00000000-0000-4000-a000-00000000001e', 234),
  (235, '2026-06-07T08:15:38.426Z', '00000000-0000-4000-a000-00000000002b', 235),
  (236, '2026-06-07T07:15:38.426Z', '00000000-0000-4000-a000-000000000038', 236),
  (237, '2026-06-07T06:15:38.426Z', '00000000-0000-4000-a000-000000000045', 237),
  (238, '2026-06-07T05:15:38.426Z', '00000000-0000-4000-a000-000000000052', 238),
  (239, '2026-06-07T04:15:38.426Z', '00000000-0000-4000-a000-00000000005f', 239),
  (240, '2026-06-07T03:15:38.426Z', '00000000-0000-4000-a000-000000000008', 240),
  (241, '2026-06-07T02:15:38.426Z', '00000000-0000-4000-a000-000000000015', 241),
  (242, '2026-06-07T01:15:38.426Z', '00000000-0000-4000-a000-000000000022', 242),
  (243, '2026-06-07T00:15:38.426Z', '00000000-0000-4000-a000-00000000002f', 243),
  (244, '2026-06-06T23:15:38.426Z', '00000000-0000-4000-a000-00000000003c', 244),
  (245, '2026-06-06T22:15:38.426Z', '00000000-0000-4000-a000-000000000049', 245),
  (246, '2026-06-06T21:15:38.426Z', '00000000-0000-4000-a000-000000000056', 246),
  (247, '2026-06-06T20:15:38.426Z', '00000000-0000-4000-a000-000000000063', 247),
  (248, '2026-06-06T19:15:38.426Z', '00000000-0000-4000-a000-00000000000c', 248),
  (249, '2026-06-06T18:15:38.426Z', '00000000-0000-4000-a000-000000000019', 249),
  (250, '2026-06-06T17:15:38.426Z', '00000000-0000-4000-a000-000000000026', 250);

INSERT INTO public.likes (id, created_at, user_id, post_id) VALUES
  (251, '2026-06-06T16:15:38.426Z', '00000000-0000-4000-a000-000000000033', 251),
  (252, '2026-06-06T15:15:38.426Z', '00000000-0000-4000-a000-000000000040', 252),
  (253, '2026-06-06T14:15:38.426Z', '00000000-0000-4000-a000-00000000004d', 253),
  (254, '2026-06-06T13:15:38.426Z', '00000000-0000-4000-a000-00000000005a', 254),
  (255, '2026-06-06T12:15:38.426Z', '00000000-0000-4000-a000-000000000003', 255),
  (256, '2026-06-06T11:15:38.426Z', '00000000-0000-4000-a000-000000000010', 256),
  (257, '2026-06-06T10:15:38.426Z', '00000000-0000-4000-a000-00000000001d', 257),
  (258, '2026-06-06T09:15:38.426Z', '00000000-0000-4000-a000-00000000002a', 258),
  (259, '2026-06-06T08:15:38.426Z', '00000000-0000-4000-a000-000000000037', 259),
  (260, '2026-06-06T07:15:38.426Z', '00000000-0000-4000-a000-000000000044', 260),
  (261, '2026-06-06T06:15:38.426Z', '00000000-0000-4000-a000-000000000051', 261),
  (262, '2026-06-06T05:15:38.426Z', '00000000-0000-4000-a000-00000000005e', 262),
  (263, '2026-06-06T04:15:38.426Z', '00000000-0000-4000-a000-000000000007', 263),
  (264, '2026-06-06T03:15:38.426Z', '00000000-0000-4000-a000-000000000014', 264),
  (265, '2026-06-06T02:15:38.426Z', '00000000-0000-4000-a000-000000000021', 265),
  (266, '2026-06-06T01:15:38.426Z', '00000000-0000-4000-a000-00000000002e', 266),
  (267, '2026-06-06T00:15:38.426Z', '00000000-0000-4000-a000-00000000003b', 267),
  (268, '2026-06-05T23:15:38.426Z', '00000000-0000-4000-a000-000000000048', 268),
  (269, '2026-06-05T22:15:38.426Z', '00000000-0000-4000-a000-000000000055', 269),
  (270, '2026-06-05T21:15:38.426Z', '00000000-0000-4000-a000-000000000062', 270),
  (271, '2026-06-05T20:15:38.426Z', '00000000-0000-4000-a000-00000000000b', 271),
  (272, '2026-06-05T19:15:38.426Z', '00000000-0000-4000-a000-000000000018', 272),
  (273, '2026-06-05T18:15:38.426Z', '00000000-0000-4000-a000-000000000025', 273),
  (274, '2026-06-05T17:15:38.426Z', '00000000-0000-4000-a000-000000000032', 274),
  (275, '2026-06-05T16:15:38.426Z', '00000000-0000-4000-a000-00000000003f', 275),
  (276, '2026-06-05T15:15:38.426Z', '00000000-0000-4000-a000-00000000004c', 276),
  (277, '2026-06-05T14:15:38.426Z', '00000000-0000-4000-a000-000000000059', 277),
  (278, '2026-06-05T13:15:38.426Z', '00000000-0000-4000-a000-000000000002', 278),
  (279, '2026-06-05T12:15:38.426Z', '00000000-0000-4000-a000-00000000000f', 279),
  (280, '2026-06-05T11:15:38.426Z', '00000000-0000-4000-a000-00000000001c', 280),
  (281, '2026-06-05T10:15:38.426Z', '00000000-0000-4000-a000-000000000029', 281),
  (282, '2026-06-05T09:15:38.426Z', '00000000-0000-4000-a000-000000000036', 282),
  (283, '2026-06-05T08:15:38.426Z', '00000000-0000-4000-a000-000000000043', 283),
  (284, '2026-06-05T07:15:38.426Z', '00000000-0000-4000-a000-000000000050', 284),
  (285, '2026-06-05T06:15:38.426Z', '00000000-0000-4000-a000-00000000005d', 285),
  (286, '2026-06-05T05:15:38.426Z', '00000000-0000-4000-a000-000000000006', 286),
  (287, '2026-06-05T04:15:38.426Z', '00000000-0000-4000-a000-000000000013', 287),
  (288, '2026-06-05T03:15:38.426Z', '00000000-0000-4000-a000-000000000020', 288),
  (289, '2026-06-05T02:15:38.426Z', '00000000-0000-4000-a000-00000000002d', 289),
  (290, '2026-06-05T01:15:38.426Z', '00000000-0000-4000-a000-00000000003a', 290),
  (291, '2026-06-05T00:15:38.426Z', '00000000-0000-4000-a000-000000000047', 291),
  (292, '2026-06-04T23:15:38.426Z', '00000000-0000-4000-a000-000000000054', 292),
  (293, '2026-06-07T23:15:38.426Z', '00000000-0000-4000-a000-000000000061', 293),
  (294, '2026-06-07T22:15:38.426Z', '00000000-0000-4000-a000-00000000000a', 294),
  (295, '2026-06-07T21:15:38.426Z', '00000000-0000-4000-a000-000000000017', 295),
  (296, '2026-06-07T20:15:38.426Z', '00000000-0000-4000-a000-000000000024', 296),
  (297, '2026-06-07T19:15:38.426Z', '00000000-0000-4000-a000-000000000031', 297),
  (298, '2026-06-07T18:15:38.426Z', '00000000-0000-4000-a000-00000000003e', 298),
  (299, '2026-06-07T17:15:38.426Z', '00000000-0000-4000-a000-00000000004b', 299),
  (300, '2026-06-07T16:15:38.426Z', '00000000-0000-4000-a000-000000000058', 1);

INSERT INTO public.likes (id, created_at, user_id, post_id) VALUES
  (301, '2026-06-07T15:15:38.426Z', '00000000-0000-4000-a000-000000000001', 2),
  (302, '2026-06-07T14:15:38.426Z', '00000000-0000-4000-a000-00000000000e', 3),
  (303, '2026-06-07T13:15:38.426Z', '00000000-0000-4000-a000-00000000001b', 4),
  (304, '2026-06-07T12:15:38.426Z', '00000000-0000-4000-a000-000000000028', 5),
  (305, '2026-06-07T11:15:38.426Z', '00000000-0000-4000-a000-000000000035', 6),
  (306, '2026-06-07T10:15:38.426Z', '00000000-0000-4000-a000-000000000042', 7),
  (307, '2026-06-07T09:15:38.426Z', '00000000-0000-4000-a000-00000000004f', 8),
  (308, '2026-06-07T08:15:38.426Z', '00000000-0000-4000-a000-00000000005c', 9),
  (309, '2026-06-07T07:15:38.426Z', '00000000-0000-4000-a000-000000000005', 10),
  (310, '2026-06-07T06:15:38.426Z', '00000000-0000-4000-a000-000000000012', 11),
  (311, '2026-06-07T05:15:38.426Z', '00000000-0000-4000-a000-00000000001f', 12),
  (312, '2026-06-07T04:15:38.426Z', '00000000-0000-4000-a000-00000000002c', 13),
  (313, '2026-06-07T03:15:38.426Z', '00000000-0000-4000-a000-000000000039', 14),
  (314, '2026-06-07T02:15:38.426Z', '00000000-0000-4000-a000-000000000046', 15),
  (315, '2026-06-07T01:15:38.426Z', '00000000-0000-4000-a000-000000000053', 16),
  (316, '2026-06-07T00:15:38.426Z', '00000000-0000-4000-a000-000000000060', 17),
  (317, '2026-06-06T23:15:38.426Z', '00000000-0000-4000-a000-000000000009', 18),
  (318, '2026-06-06T22:15:38.426Z', '00000000-0000-4000-a000-000000000016', 19),
  (319, '2026-06-06T21:15:38.426Z', '00000000-0000-4000-a000-000000000023', 20),
  (320, '2026-06-06T20:15:38.426Z', '00000000-0000-4000-a000-000000000030', 21),
  (321, '2026-06-06T19:15:38.426Z', '00000000-0000-4000-a000-00000000003d', 22),
  (322, '2026-06-06T18:15:38.426Z', '00000000-0000-4000-a000-00000000004a', 23),
  (323, '2026-06-06T17:15:38.426Z', '00000000-0000-4000-a000-000000000057', 24),
  (324, '2026-06-06T16:15:38.426Z', '00000000-0000-4000-a000-000000000064', 25),
  (325, '2026-06-06T15:15:38.426Z', '00000000-0000-4000-a000-00000000000d', 26),
  (326, '2026-06-06T14:15:38.426Z', '00000000-0000-4000-a000-00000000001a', 27),
  (327, '2026-06-06T13:15:38.426Z', '00000000-0000-4000-a000-000000000027', 28),
  (328, '2026-06-06T12:15:38.426Z', '00000000-0000-4000-a000-000000000034', 29),
  (329, '2026-06-06T11:15:38.426Z', '00000000-0000-4000-a000-000000000041', 30),
  (330, '2026-06-06T10:15:38.426Z', '00000000-0000-4000-a000-00000000004e', 31),
  (331, '2026-06-06T09:15:38.426Z', '00000000-0000-4000-a000-00000000005b', 32),
  (332, '2026-06-06T08:15:38.426Z', '00000000-0000-4000-a000-000000000004', 33),
  (333, '2026-06-06T07:15:38.426Z', '00000000-0000-4000-a000-000000000011', 34),
  (334, '2026-06-06T06:15:38.426Z', '00000000-0000-4000-a000-00000000001e', 35),
  (335, '2026-06-06T05:15:38.426Z', '00000000-0000-4000-a000-00000000002b', 36),
  (336, '2026-06-06T04:15:38.426Z', '00000000-0000-4000-a000-000000000038', 37),
  (337, '2026-06-06T03:15:38.426Z', '00000000-0000-4000-a000-000000000045', 38),
  (338, '2026-06-06T02:15:38.426Z', '00000000-0000-4000-a000-000000000052', 39),
  (339, '2026-06-06T01:15:38.426Z', '00000000-0000-4000-a000-00000000005f', 40),
  (340, '2026-06-06T00:15:38.426Z', '00000000-0000-4000-a000-000000000008', 41),
  (341, '2026-06-05T23:15:38.426Z', '00000000-0000-4000-a000-000000000015', 42),
  (342, '2026-06-05T22:15:38.426Z', '00000000-0000-4000-a000-000000000022', 43),
  (343, '2026-06-05T21:15:38.426Z', '00000000-0000-4000-a000-00000000002f', 44),
  (344, '2026-06-05T20:15:38.426Z', '00000000-0000-4000-a000-00000000003c', 45),
  (345, '2026-06-05T19:15:38.426Z', '00000000-0000-4000-a000-000000000049', 46),
  (346, '2026-06-05T18:15:38.426Z', '00000000-0000-4000-a000-000000000056', 47),
  (347, '2026-06-05T17:15:38.426Z', '00000000-0000-4000-a000-000000000063', 48),
  (348, '2026-06-05T16:15:38.426Z', '00000000-0000-4000-a000-00000000000c', 49),
  (349, '2026-06-05T15:15:38.426Z', '00000000-0000-4000-a000-000000000019', 50),
  (350, '2026-06-05T14:15:38.426Z', '00000000-0000-4000-a000-000000000026', 51);

INSERT INTO public.likes (id, created_at, user_id, post_id) VALUES
  (351, '2026-06-05T13:15:38.426Z', '00000000-0000-4000-a000-000000000033', 52),
  (352, '2026-06-05T12:15:38.426Z', '00000000-0000-4000-a000-000000000040', 53),
  (353, '2026-06-05T11:15:38.426Z', '00000000-0000-4000-a000-00000000004d', 54),
  (354, '2026-06-05T10:15:38.426Z', '00000000-0000-4000-a000-00000000005a', 55),
  (355, '2026-06-05T09:15:38.426Z', '00000000-0000-4000-a000-000000000003', 56),
  (356, '2026-06-05T08:15:38.426Z', '00000000-0000-4000-a000-000000000010', 57),
  (357, '2026-06-05T07:15:38.426Z', '00000000-0000-4000-a000-00000000001d', 58),
  (358, '2026-06-05T06:15:38.426Z', '00000000-0000-4000-a000-00000000002a', 59),
  (359, '2026-06-05T05:15:38.426Z', '00000000-0000-4000-a000-000000000037', 60),
  (360, '2026-06-05T04:15:38.426Z', '00000000-0000-4000-a000-000000000044', 61),
  (361, '2026-06-05T03:15:38.426Z', '00000000-0000-4000-a000-000000000051', 62),
  (362, '2026-06-05T02:15:38.426Z', '00000000-0000-4000-a000-00000000005e', 63),
  (363, '2026-06-05T01:15:38.426Z', '00000000-0000-4000-a000-000000000007', 64),
  (364, '2026-06-05T00:15:38.426Z', '00000000-0000-4000-a000-000000000014', 65),
  (365, '2026-06-04T23:15:38.426Z', '00000000-0000-4000-a000-000000000021', 66),
  (366, '2026-06-07T23:15:38.426Z', '00000000-0000-4000-a000-00000000002e', 67),
  (367, '2026-06-07T22:15:38.426Z', '00000000-0000-4000-a000-00000000003b', 68),
  (368, '2026-06-07T21:15:38.426Z', '00000000-0000-4000-a000-000000000048', 69),
  (369, '2026-06-07T20:15:38.426Z', '00000000-0000-4000-a000-000000000055', 70),
  (370, '2026-06-07T19:15:38.426Z', '00000000-0000-4000-a000-000000000062', 71),
  (371, '2026-06-07T18:15:38.426Z', '00000000-0000-4000-a000-00000000000b', 72),
  (372, '2026-06-07T17:15:38.426Z', '00000000-0000-4000-a000-000000000018', 73),
  (373, '2026-06-07T16:15:38.426Z', '00000000-0000-4000-a000-000000000025', 74),
  (374, '2026-06-07T15:15:38.426Z', '00000000-0000-4000-a000-000000000032', 75),
  (375, '2026-06-07T14:15:38.426Z', '00000000-0000-4000-a000-00000000003f', 76),
  (376, '2026-06-07T13:15:38.426Z', '00000000-0000-4000-a000-00000000004c', 77),
  (377, '2026-06-07T12:15:38.426Z', '00000000-0000-4000-a000-000000000059', 78),
  (378, '2026-06-07T11:15:38.426Z', '00000000-0000-4000-a000-000000000002', 79),
  (379, '2026-06-07T10:15:38.426Z', '00000000-0000-4000-a000-00000000000f', 80),
  (380, '2026-06-07T09:15:38.426Z', '00000000-0000-4000-a000-00000000001c', 81),
  (381, '2026-06-07T08:15:38.426Z', '00000000-0000-4000-a000-000000000029', 82),
  (382, '2026-06-07T07:15:38.426Z', '00000000-0000-4000-a000-000000000036', 83),
  (383, '2026-06-07T06:15:38.426Z', '00000000-0000-4000-a000-000000000043', 84),
  (384, '2026-06-07T05:15:38.426Z', '00000000-0000-4000-a000-000000000050', 85),
  (385, '2026-06-07T04:15:38.426Z', '00000000-0000-4000-a000-00000000005d', 86),
  (386, '2026-06-07T03:15:38.426Z', '00000000-0000-4000-a000-000000000006', 87),
  (387, '2026-06-07T02:15:38.426Z', '00000000-0000-4000-a000-000000000013', 88),
  (388, '2026-06-07T01:15:38.426Z', '00000000-0000-4000-a000-000000000020', 89),
  (389, '2026-06-07T00:15:38.426Z', '00000000-0000-4000-a000-00000000002d', 90),
  (390, '2026-06-06T23:15:38.426Z', '00000000-0000-4000-a000-00000000003a', 91),
  (391, '2026-06-06T22:15:38.426Z', '00000000-0000-4000-a000-000000000047', 92),
  (392, '2026-06-06T21:15:38.426Z', '00000000-0000-4000-a000-000000000054', 93),
  (393, '2026-06-06T20:15:38.426Z', '00000000-0000-4000-a000-000000000061', 94),
  (394, '2026-06-06T19:15:38.426Z', '00000000-0000-4000-a000-00000000000a', 95),
  (395, '2026-06-06T18:15:38.426Z', '00000000-0000-4000-a000-000000000017', 96),
  (396, '2026-06-06T17:15:38.426Z', '00000000-0000-4000-a000-000000000024', 97),
  (397, '2026-06-06T16:15:38.426Z', '00000000-0000-4000-a000-000000000031', 98),
  (398, '2026-06-06T15:15:38.426Z', '00000000-0000-4000-a000-00000000003e', 99),
  (399, '2026-06-06T14:15:38.426Z', '00000000-0000-4000-a000-00000000004b', 100),
  (400, '2026-06-06T13:15:38.426Z', '00000000-0000-4000-a000-000000000058', 101);

-- ========== SEGUIDORES ==========
INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (1, '2026-06-05T23:15:38.426Z', '00000000-0000-4000-a000-000000000001', '00000000-0000-4000-a000-00000000000e'),
  (2, '2026-06-04T23:15:38.426Z', '00000000-0000-4000-a000-000000000001', '00000000-0000-4000-a000-00000000001b'),
  (3, '2026-06-03T23:15:38.426Z', '00000000-0000-4000-a000-000000000001', '00000000-0000-4000-a000-000000000028'),
  (4, '2026-06-02T23:15:38.426Z', '00000000-0000-4000-a000-000000000001', '00000000-0000-4000-a000-000000000035'),
  (5, '2026-06-01T23:15:38.426Z', '00000000-0000-4000-a000-000000000002', '00000000-0000-4000-a000-000000000008'),
  (6, '2026-05-31T23:15:38.426Z', '00000000-0000-4000-a000-000000000002', '00000000-0000-4000-a000-000000000015'),
  (7, '2026-05-30T23:15:38.426Z', '00000000-0000-4000-a000-000000000002', '00000000-0000-4000-a000-000000000022'),
  (8, '2026-05-29T23:15:38.426Z', '00000000-0000-4000-a000-000000000002', '00000000-0000-4000-a000-00000000002f'),
  (9, '2026-05-28T23:15:38.426Z', '00000000-0000-4000-a000-000000000002', '00000000-0000-4000-a000-00000000003c'),
  (10, '2026-05-27T23:15:38.426Z', '00000000-0000-4000-a000-000000000002', '00000000-0000-4000-a000-000000000049'),
  (11, '2026-05-26T23:15:38.426Z', '00000000-0000-4000-a000-000000000003', '00000000-0000-4000-a000-00000000000f'),
  (12, '2026-05-25T23:15:38.426Z', '00000000-0000-4000-a000-000000000003', '00000000-0000-4000-a000-00000000001c'),
  (13, '2026-05-24T23:15:38.426Z', '00000000-0000-4000-a000-000000000003', '00000000-0000-4000-a000-000000000029'),
  (14, '2026-05-23T23:15:38.426Z', '00000000-0000-4000-a000-000000000003', '00000000-0000-4000-a000-000000000036'),
  (15, '2026-05-22T23:15:38.426Z', '00000000-0000-4000-a000-000000000003', '00000000-0000-4000-a000-000000000043'),
  (16, '2026-05-21T23:15:38.426Z', '00000000-0000-4000-a000-000000000003', '00000000-0000-4000-a000-000000000050'),
  (17, '2026-05-20T23:15:38.426Z', '00000000-0000-4000-a000-000000000003', '00000000-0000-4000-a000-00000000005d'),
  (18, '2026-05-19T23:15:38.426Z', '00000000-0000-4000-a000-000000000004', '00000000-0000-4000-a000-000000000016'),
  (19, '2026-05-18T23:15:38.426Z', '00000000-0000-4000-a000-000000000004', '00000000-0000-4000-a000-000000000023'),
  (20, '2026-05-17T23:15:38.426Z', '00000000-0000-4000-a000-000000000004', '00000000-0000-4000-a000-000000000030'),
  (21, '2026-05-16T23:15:38.426Z', '00000000-0000-4000-a000-000000000004', '00000000-0000-4000-a000-00000000003d'),
  (22, '2026-05-15T23:15:38.426Z', '00000000-0000-4000-a000-000000000004', '00000000-0000-4000-a000-00000000004a'),
  (23, '2026-05-14T23:15:38.426Z', '00000000-0000-4000-a000-000000000004', '00000000-0000-4000-a000-000000000057'),
  (24, '2026-05-13T23:15:38.426Z', '00000000-0000-4000-a000-000000000004', '00000000-0000-4000-a000-000000000064'),
  (25, '2026-05-12T23:15:38.426Z', '00000000-0000-4000-a000-000000000004', '00000000-0000-4000-a000-00000000000d'),
  (26, '2026-05-11T23:15:38.426Z', '00000000-0000-4000-a000-000000000005', '00000000-0000-4000-a000-00000000001d'),
  (27, '2026-05-10T23:15:38.426Z', '00000000-0000-4000-a000-000000000005', '00000000-0000-4000-a000-00000000002a'),
  (28, '2026-05-09T23:15:38.426Z', '00000000-0000-4000-a000-000000000005', '00000000-0000-4000-a000-000000000037'),
  (29, '2026-05-08T23:15:38.426Z', '00000000-0000-4000-a000-000000000005', '00000000-0000-4000-a000-000000000044'),
  (30, '2026-05-07T23:15:38.426Z', '00000000-0000-4000-a000-000000000005', '00000000-0000-4000-a000-000000000051'),
  (31, '2026-05-06T23:15:38.426Z', '00000000-0000-4000-a000-000000000005', '00000000-0000-4000-a000-00000000005e'),
  (32, '2026-05-05T23:15:38.426Z', '00000000-0000-4000-a000-000000000005', '00000000-0000-4000-a000-000000000007'),
  (33, '2026-05-04T23:15:38.426Z', '00000000-0000-4000-a000-000000000005', '00000000-0000-4000-a000-000000000014'),
  (34, '2026-05-03T23:15:38.426Z', '00000000-0000-4000-a000-000000000005', '00000000-0000-4000-a000-000000000021'),
  (35, '2026-05-02T23:15:38.426Z', '00000000-0000-4000-a000-000000000006', '00000000-0000-4000-a000-000000000024'),
  (36, '2026-05-01T23:15:38.426Z', '00000000-0000-4000-a000-000000000006', '00000000-0000-4000-a000-000000000031'),
  (37, '2026-04-30T23:15:38.426Z', '00000000-0000-4000-a000-000000000006', '00000000-0000-4000-a000-00000000003e'),
  (38, '2026-04-29T23:15:38.426Z', '00000000-0000-4000-a000-000000000006', '00000000-0000-4000-a000-00000000004b'),
  (39, '2026-04-28T23:15:38.426Z', '00000000-0000-4000-a000-000000000006', '00000000-0000-4000-a000-000000000058'),
  (40, '2026-04-27T23:15:38.426Z', '00000000-0000-4000-a000-000000000006', '00000000-0000-4000-a000-000000000001'),
  (41, '2026-04-26T23:15:38.427Z', '00000000-0000-4000-a000-000000000006', '00000000-0000-4000-a000-00000000000e'),
  (42, '2026-04-25T23:15:38.427Z', '00000000-0000-4000-a000-000000000006', '00000000-0000-4000-a000-00000000001b'),
  (43, '2026-04-24T23:15:38.427Z', '00000000-0000-4000-a000-000000000006', '00000000-0000-4000-a000-000000000028'),
  (44, '2026-04-23T23:15:38.427Z', '00000000-0000-4000-a000-000000000006', '00000000-0000-4000-a000-000000000035'),
  (45, '2026-04-22T23:15:38.427Z', '00000000-0000-4000-a000-000000000007', '00000000-0000-4000-a000-00000000002b'),
  (46, '2026-04-21T23:15:38.427Z', '00000000-0000-4000-a000-000000000007', '00000000-0000-4000-a000-000000000038'),
  (47, '2026-04-20T23:15:38.427Z', '00000000-0000-4000-a000-000000000007', '00000000-0000-4000-a000-000000000045'),
  (48, '2026-04-19T23:15:38.427Z', '00000000-0000-4000-a000-000000000007', '00000000-0000-4000-a000-000000000052'),
  (49, '2026-04-18T23:15:38.427Z', '00000000-0000-4000-a000-000000000007', '00000000-0000-4000-a000-00000000005f'),
  (50, '2026-04-17T23:15:38.427Z', '00000000-0000-4000-a000-000000000007', '00000000-0000-4000-a000-000000000008');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (51, '2026-04-16T23:15:38.427Z', '00000000-0000-4000-a000-000000000007', '00000000-0000-4000-a000-000000000015'),
  (52, '2026-04-15T23:15:38.427Z', '00000000-0000-4000-a000-000000000007', '00000000-0000-4000-a000-000000000022'),
  (53, '2026-04-14T23:15:38.427Z', '00000000-0000-4000-a000-000000000007', '00000000-0000-4000-a000-00000000002f'),
  (54, '2026-04-13T23:15:38.427Z', '00000000-0000-4000-a000-000000000007', '00000000-0000-4000-a000-00000000003c'),
  (55, '2026-04-12T23:15:38.427Z', '00000000-0000-4000-a000-000000000007', '00000000-0000-4000-a000-000000000049'),
  (56, '2026-04-11T23:15:38.427Z', '00000000-0000-4000-a000-000000000008', '00000000-0000-4000-a000-000000000032'),
  (57, '2026-04-10T23:15:38.427Z', '00000000-0000-4000-a000-000000000008', '00000000-0000-4000-a000-00000000003f'),
  (58, '2026-04-09T23:15:38.427Z', '00000000-0000-4000-a000-000000000008', '00000000-0000-4000-a000-00000000004c'),
  (59, '2026-04-08T23:15:38.427Z', '00000000-0000-4000-a000-000000000008', '00000000-0000-4000-a000-000000000059'),
  (60, '2026-04-07T23:15:38.427Z', '00000000-0000-4000-a000-000000000008', '00000000-0000-4000-a000-000000000002'),
  (61, '2026-04-06T23:15:38.427Z', '00000000-0000-4000-a000-000000000008', '00000000-0000-4000-a000-00000000000f'),
  (62, '2026-04-05T23:15:38.427Z', '00000000-0000-4000-a000-000000000008', '00000000-0000-4000-a000-00000000001c'),
  (63, '2026-04-04T23:15:38.427Z', '00000000-0000-4000-a000-000000000008', '00000000-0000-4000-a000-000000000029'),
  (64, '2026-04-03T23:15:38.427Z', '00000000-0000-4000-a000-000000000008', '00000000-0000-4000-a000-000000000036'),
  (65, '2026-04-02T23:15:38.427Z', '00000000-0000-4000-a000-000000000008', '00000000-0000-4000-a000-000000000043'),
  (66, '2026-04-01T23:15:38.427Z', '00000000-0000-4000-a000-000000000008', '00000000-0000-4000-a000-000000000050'),
  (67, '2026-03-31T23:15:38.427Z', '00000000-0000-4000-a000-000000000008', '00000000-0000-4000-a000-00000000005d'),
  (68, '2026-03-30T23:15:38.427Z', '00000000-0000-4000-a000-000000000009', '00000000-0000-4000-a000-000000000039'),
  (69, '2026-03-29T23:15:38.427Z', '00000000-0000-4000-a000-000000000009', '00000000-0000-4000-a000-000000000046'),
  (70, '2026-03-28T23:15:38.427Z', '00000000-0000-4000-a000-000000000009', '00000000-0000-4000-a000-000000000053'),
  (71, '2026-03-27T23:15:38.427Z', '00000000-0000-4000-a000-000000000009', '00000000-0000-4000-a000-000000000060'),
  (72, '2026-03-26T23:15:38.427Z', '00000000-0000-4000-a000-000000000009', '00000000-0000-4000-a000-000000000016'),
  (73, '2026-03-25T23:15:38.427Z', '00000000-0000-4000-a000-000000000009', '00000000-0000-4000-a000-000000000023'),
  (74, '2026-03-24T23:15:38.427Z', '00000000-0000-4000-a000-000000000009', '00000000-0000-4000-a000-000000000030'),
  (75, '2026-03-23T23:15:38.427Z', '00000000-0000-4000-a000-000000000009', '00000000-0000-4000-a000-00000000003d'),
  (76, '2026-03-22T23:15:38.427Z', '00000000-0000-4000-a000-000000000009', '00000000-0000-4000-a000-00000000004a'),
  (77, '2026-03-21T23:15:38.427Z', '00000000-0000-4000-a000-000000000009', '00000000-0000-4000-a000-000000000057'),
  (78, '2026-03-20T23:15:38.427Z', '00000000-0000-4000-a000-000000000009', '00000000-0000-4000-a000-000000000064'),
  (79, '2026-03-19T23:15:38.427Z', '00000000-0000-4000-a000-000000000009', '00000000-0000-4000-a000-00000000000d'),
  (80, '2026-03-18T23:15:38.427Z', '00000000-0000-4000-a000-00000000000a', '00000000-0000-4000-a000-000000000040'),
  (81, '2026-03-17T23:15:38.427Z', '00000000-0000-4000-a000-00000000000a', '00000000-0000-4000-a000-00000000004d'),
  (82, '2026-03-16T23:15:38.427Z', '00000000-0000-4000-a000-00000000000a', '00000000-0000-4000-a000-00000000005a'),
  (83, '2026-03-15T23:15:38.427Z', '00000000-0000-4000-a000-00000000000a', '00000000-0000-4000-a000-000000000003'),
  (84, '2026-03-14T23:15:38.427Z', '00000000-0000-4000-a000-00000000000a', '00000000-0000-4000-a000-000000000010'),
  (85, '2026-03-13T23:15:38.427Z', '00000000-0000-4000-a000-00000000000a', '00000000-0000-4000-a000-00000000001d'),
  (86, '2026-03-12T23:15:38.427Z', '00000000-0000-4000-a000-00000000000a', '00000000-0000-4000-a000-00000000002a'),
  (87, '2026-03-11T23:15:38.427Z', '00000000-0000-4000-a000-00000000000a', '00000000-0000-4000-a000-000000000037'),
  (88, '2026-03-10T23:15:38.427Z', '00000000-0000-4000-a000-00000000000a', '00000000-0000-4000-a000-000000000044'),
  (89, '2026-03-09T23:15:38.427Z', '00000000-0000-4000-a000-00000000000a', '00000000-0000-4000-a000-000000000051'),
  (90, '2026-03-08T23:15:38.427Z', '00000000-0000-4000-a000-00000000000a', '00000000-0000-4000-a000-00000000005e'),
  (91, '2026-03-07T23:15:38.427Z', '00000000-0000-4000-a000-00000000000a', '00000000-0000-4000-a000-000000000007'),
  (92, '2026-03-06T23:15:38.427Z', '00000000-0000-4000-a000-00000000000a', '00000000-0000-4000-a000-000000000014'),
  (93, '2026-03-05T23:15:38.427Z', '00000000-0000-4000-a000-00000000000a', '00000000-0000-4000-a000-000000000021'),
  (94, '2026-03-04T23:15:38.427Z', '00000000-0000-4000-a000-00000000000b', '00000000-0000-4000-a000-000000000047'),
  (95, '2026-03-03T23:15:38.427Z', '00000000-0000-4000-a000-00000000000b', '00000000-0000-4000-a000-000000000054'),
  (96, '2026-03-02T23:15:38.427Z', '00000000-0000-4000-a000-00000000000b', '00000000-0000-4000-a000-000000000061'),
  (97, '2026-03-01T23:15:38.427Z', '00000000-0000-4000-a000-00000000000b', '00000000-0000-4000-a000-00000000000a'),
  (98, '2026-02-28T23:15:38.427Z', '00000000-0000-4000-a000-00000000000b', '00000000-0000-4000-a000-000000000017'),
  (99, '2026-02-27T23:15:38.427Z', '00000000-0000-4000-a000-00000000000b', '00000000-0000-4000-a000-000000000024'),
  (100, '2026-02-26T23:15:38.427Z', '00000000-0000-4000-a000-00000000000b', '00000000-0000-4000-a000-000000000031');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (101, '2026-02-25T23:15:38.427Z', '00000000-0000-4000-a000-00000000000b', '00000000-0000-4000-a000-00000000003e'),
  (102, '2026-02-24T23:15:38.427Z', '00000000-0000-4000-a000-00000000000b', '00000000-0000-4000-a000-00000000004b'),
  (103, '2026-02-23T23:15:38.427Z', '00000000-0000-4000-a000-00000000000b', '00000000-0000-4000-a000-000000000058'),
  (104, '2026-02-22T23:15:38.427Z', '00000000-0000-4000-a000-00000000000b', '00000000-0000-4000-a000-000000000001'),
  (105, '2026-02-21T23:15:38.427Z', '00000000-0000-4000-a000-00000000000b', '00000000-0000-4000-a000-00000000000e'),
  (106, '2026-02-20T23:15:38.427Z', '00000000-0000-4000-a000-00000000000b', '00000000-0000-4000-a000-00000000001b'),
  (107, '2026-02-19T23:15:38.427Z', '00000000-0000-4000-a000-00000000000b', '00000000-0000-4000-a000-000000000028'),
  (108, '2026-02-18T23:15:38.427Z', '00000000-0000-4000-a000-00000000000b', '00000000-0000-4000-a000-000000000035'),
  (109, '2026-02-17T23:15:38.427Z', '00000000-0000-4000-a000-00000000000c', '00000000-0000-4000-a000-00000000004e'),
  (110, '2026-02-16T23:15:38.427Z', '00000000-0000-4000-a000-00000000000c', '00000000-0000-4000-a000-00000000005b'),
  (111, '2026-02-15T23:15:38.427Z', '00000000-0000-4000-a000-00000000000c', '00000000-0000-4000-a000-000000000004'),
  (112, '2026-02-14T23:15:38.427Z', '00000000-0000-4000-a000-00000000000c', '00000000-0000-4000-a000-000000000011'),
  (113, '2026-02-13T23:15:38.427Z', '00000000-0000-4000-a000-00000000000c', '00000000-0000-4000-a000-00000000001e'),
  (114, '2026-02-12T23:15:38.427Z', '00000000-0000-4000-a000-00000000000c', '00000000-0000-4000-a000-00000000002b'),
  (115, '2026-02-11T23:15:38.427Z', '00000000-0000-4000-a000-00000000000c', '00000000-0000-4000-a000-000000000038'),
  (116, '2026-02-10T23:15:38.427Z', '00000000-0000-4000-a000-00000000000c', '00000000-0000-4000-a000-000000000045'),
  (117, '2026-02-09T23:15:38.427Z', '00000000-0000-4000-a000-00000000000c', '00000000-0000-4000-a000-000000000052'),
  (118, '2026-02-08T23:15:38.427Z', '00000000-0000-4000-a000-00000000000c', '00000000-0000-4000-a000-00000000005f'),
  (119, '2026-02-07T23:15:38.427Z', '00000000-0000-4000-a000-00000000000c', '00000000-0000-4000-a000-000000000008'),
  (120, '2026-02-06T23:15:38.427Z', '00000000-0000-4000-a000-00000000000c', '00000000-0000-4000-a000-000000000015'),
  (121, '2026-02-05T23:15:38.427Z', '00000000-0000-4000-a000-00000000000c', '00000000-0000-4000-a000-000000000022'),
  (122, '2026-02-04T23:15:38.427Z', '00000000-0000-4000-a000-00000000000c', '00000000-0000-4000-a000-00000000002f'),
  (123, '2026-02-03T23:15:38.427Z', '00000000-0000-4000-a000-00000000000c', '00000000-0000-4000-a000-00000000003c'),
  (124, '2026-02-02T23:15:38.427Z', '00000000-0000-4000-a000-00000000000c', '00000000-0000-4000-a000-000000000049'),
  (125, '2026-02-01T23:15:38.427Z', '00000000-0000-4000-a000-00000000000d', '00000000-0000-4000-a000-000000000055'),
  (126, '2026-01-31T23:15:38.427Z', '00000000-0000-4000-a000-00000000000d', '00000000-0000-4000-a000-000000000062'),
  (127, '2026-01-30T23:15:38.427Z', '00000000-0000-4000-a000-00000000000d', '00000000-0000-4000-a000-00000000000b'),
  (128, '2026-01-29T23:15:38.427Z', '00000000-0000-4000-a000-00000000000d', '00000000-0000-4000-a000-000000000018'),
  (129, '2026-01-28T23:15:38.427Z', '00000000-0000-4000-a000-00000000000d', '00000000-0000-4000-a000-000000000025'),
  (130, '2026-01-27T23:15:38.427Z', '00000000-0000-4000-a000-00000000000d', '00000000-0000-4000-a000-000000000032'),
  (131, '2026-01-26T23:15:38.427Z', '00000000-0000-4000-a000-00000000000d', '00000000-0000-4000-a000-00000000003f'),
  (132, '2026-01-25T23:15:38.427Z', '00000000-0000-4000-a000-00000000000d', '00000000-0000-4000-a000-00000000004c'),
  (133, '2026-01-24T23:15:38.427Z', '00000000-0000-4000-a000-00000000000d', '00000000-0000-4000-a000-000000000059'),
  (134, '2026-01-23T23:15:38.427Z', '00000000-0000-4000-a000-00000000000d', '00000000-0000-4000-a000-000000000002'),
  (135, '2026-01-22T23:15:38.427Z', '00000000-0000-4000-a000-00000000000d', '00000000-0000-4000-a000-00000000000f'),
  (136, '2026-01-21T23:15:38.427Z', '00000000-0000-4000-a000-00000000000d', '00000000-0000-4000-a000-00000000001c'),
  (137, '2026-01-20T23:15:38.427Z', '00000000-0000-4000-a000-00000000000d', '00000000-0000-4000-a000-000000000029'),
  (138, '2026-01-19T23:15:38.427Z', '00000000-0000-4000-a000-00000000000d', '00000000-0000-4000-a000-000000000036'),
  (139, '2026-01-18T23:15:38.427Z', '00000000-0000-4000-a000-00000000000d', '00000000-0000-4000-a000-000000000043'),
  (140, '2026-01-17T23:15:38.427Z', '00000000-0000-4000-a000-00000000000d', '00000000-0000-4000-a000-000000000050'),
  (141, '2026-01-16T23:15:38.427Z', '00000000-0000-4000-a000-00000000000d', '00000000-0000-4000-a000-00000000005d'),
  (142, '2026-01-15T23:15:38.427Z', '00000000-0000-4000-a000-00000000000e', '00000000-0000-4000-a000-00000000005c'),
  (143, '2026-01-14T23:15:38.427Z', '00000000-0000-4000-a000-00000000000e', '00000000-0000-4000-a000-000000000005'),
  (144, '2026-01-13T23:15:38.427Z', '00000000-0000-4000-a000-00000000000e', '00000000-0000-4000-a000-000000000012'),
  (145, '2026-01-12T23:15:38.427Z', '00000000-0000-4000-a000-00000000000e', '00000000-0000-4000-a000-00000000001f'),
  (146, '2026-01-11T23:15:38.427Z', '00000000-0000-4000-a000-00000000000e', '00000000-0000-4000-a000-00000000002c'),
  (147, '2026-01-10T23:15:38.427Z', '00000000-0000-4000-a000-00000000000e', '00000000-0000-4000-a000-000000000039'),
  (148, '2026-01-09T23:15:38.427Z', '00000000-0000-4000-a000-00000000000e', '00000000-0000-4000-a000-000000000046'),
  (149, '2026-01-08T23:15:38.427Z', '00000000-0000-4000-a000-00000000000e', '00000000-0000-4000-a000-000000000053'),
  (150, '2026-01-07T23:15:38.427Z', '00000000-0000-4000-a000-00000000000e', '00000000-0000-4000-a000-000000000060');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (151, '2026-01-06T23:15:38.427Z', '00000000-0000-4000-a000-00000000000e', '00000000-0000-4000-a000-000000000009'),
  (152, '2026-01-05T23:15:38.427Z', '00000000-0000-4000-a000-00000000000e', '00000000-0000-4000-a000-000000000016'),
  (153, '2026-01-04T23:15:38.427Z', '00000000-0000-4000-a000-00000000000e', '00000000-0000-4000-a000-000000000023'),
  (154, '2026-01-03T23:15:38.427Z', '00000000-0000-4000-a000-00000000000e', '00000000-0000-4000-a000-000000000030'),
  (155, '2026-01-02T23:15:38.427Z', '00000000-0000-4000-a000-00000000000e', '00000000-0000-4000-a000-00000000003d'),
  (156, '2026-01-01T23:15:38.427Z', '00000000-0000-4000-a000-00000000000e', '00000000-0000-4000-a000-00000000004a'),
  (157, '2025-12-31T23:15:38.427Z', '00000000-0000-4000-a000-00000000000e', '00000000-0000-4000-a000-000000000057'),
  (158, '2025-12-30T23:15:38.427Z', '00000000-0000-4000-a000-00000000000e', '00000000-0000-4000-a000-000000000064'),
  (159, '2025-12-29T23:15:38.427Z', '00000000-0000-4000-a000-00000000000e', '00000000-0000-4000-a000-00000000000d'),
  (160, '2025-12-28T23:15:38.427Z', '00000000-0000-4000-a000-00000000000f', '00000000-0000-4000-a000-000000000063'),
  (161, '2025-12-27T23:15:38.427Z', '00000000-0000-4000-a000-00000000000f', '00000000-0000-4000-a000-00000000000c'),
  (162, '2025-12-26T23:15:38.427Z', '00000000-0000-4000-a000-00000000000f', '00000000-0000-4000-a000-000000000019'),
  (163, '2025-12-25T23:15:38.427Z', '00000000-0000-4000-a000-00000000000f', '00000000-0000-4000-a000-000000000026'),
  (164, '2025-12-24T23:15:38.427Z', '00000000-0000-4000-a000-00000000000f', '00000000-0000-4000-a000-000000000033'),
  (165, '2025-12-23T23:15:38.427Z', '00000000-0000-4000-a000-00000000000f', '00000000-0000-4000-a000-000000000040'),
  (166, '2025-12-22T23:15:38.427Z', '00000000-0000-4000-a000-00000000000f', '00000000-0000-4000-a000-00000000004d'),
  (167, '2025-12-21T23:15:38.427Z', '00000000-0000-4000-a000-00000000000f', '00000000-0000-4000-a000-00000000005a'),
  (168, '2025-12-20T23:15:38.427Z', '00000000-0000-4000-a000-00000000000f', '00000000-0000-4000-a000-000000000003'),
  (169, '2025-12-19T23:15:38.427Z', '00000000-0000-4000-a000-00000000000f', '00000000-0000-4000-a000-000000000010'),
  (170, '2025-12-18T23:15:38.427Z', '00000000-0000-4000-a000-00000000000f', '00000000-0000-4000-a000-00000000001d'),
  (171, '2025-12-17T23:15:38.427Z', '00000000-0000-4000-a000-00000000000f', '00000000-0000-4000-a000-00000000002a'),
  (172, '2025-12-16T23:15:38.427Z', '00000000-0000-4000-a000-00000000000f', '00000000-0000-4000-a000-000000000037'),
  (173, '2025-12-15T23:15:38.427Z', '00000000-0000-4000-a000-00000000000f', '00000000-0000-4000-a000-000000000044'),
  (174, '2025-12-14T23:15:38.427Z', '00000000-0000-4000-a000-00000000000f', '00000000-0000-4000-a000-000000000051'),
  (175, '2025-12-13T23:15:38.427Z', '00000000-0000-4000-a000-00000000000f', '00000000-0000-4000-a000-00000000005e'),
  (176, '2025-12-12T23:15:38.427Z', '00000000-0000-4000-a000-00000000000f', '00000000-0000-4000-a000-000000000007'),
  (177, '2025-12-11T23:15:38.427Z', '00000000-0000-4000-a000-00000000000f', '00000000-0000-4000-a000-000000000014'),
  (178, '2025-12-10T23:15:38.427Z', '00000000-0000-4000-a000-00000000000f', '00000000-0000-4000-a000-000000000021'),
  (179, '2025-12-09T23:15:38.427Z', '00000000-0000-4000-a000-000000000010', '00000000-0000-4000-a000-000000000006'),
  (180, '2025-12-08T23:15:38.427Z', '00000000-0000-4000-a000-000000000010', '00000000-0000-4000-a000-000000000013'),
  (181, '2025-12-07T23:15:38.427Z', '00000000-0000-4000-a000-000000000010', '00000000-0000-4000-a000-000000000020'),
  (182, '2025-12-06T23:15:38.427Z', '00000000-0000-4000-a000-000000000010', '00000000-0000-4000-a000-00000000002d'),
  (183, '2025-12-05T23:15:38.427Z', '00000000-0000-4000-a000-000000000010', '00000000-0000-4000-a000-00000000003a'),
  (184, '2025-12-04T23:15:38.427Z', '00000000-0000-4000-a000-000000000010', '00000000-0000-4000-a000-000000000047'),
  (185, '2025-12-03T23:15:38.427Z', '00000000-0000-4000-a000-000000000010', '00000000-0000-4000-a000-000000000054'),
  (186, '2025-12-02T23:15:38.427Z', '00000000-0000-4000-a000-000000000010', '00000000-0000-4000-a000-000000000061'),
  (187, '2025-12-01T23:15:38.427Z', '00000000-0000-4000-a000-000000000010', '00000000-0000-4000-a000-00000000000a'),
  (188, '2025-11-30T23:15:38.427Z', '00000000-0000-4000-a000-000000000010', '00000000-0000-4000-a000-000000000017'),
  (189, '2025-11-29T23:15:38.427Z', '00000000-0000-4000-a000-000000000010', '00000000-0000-4000-a000-000000000024'),
  (190, '2025-11-28T23:15:38.427Z', '00000000-0000-4000-a000-000000000010', '00000000-0000-4000-a000-000000000031'),
  (191, '2025-11-27T23:15:38.427Z', '00000000-0000-4000-a000-000000000010', '00000000-0000-4000-a000-00000000003e'),
  (192, '2025-11-26T23:15:38.427Z', '00000000-0000-4000-a000-000000000010', '00000000-0000-4000-a000-00000000004b'),
  (193, '2025-11-25T23:15:38.427Z', '00000000-0000-4000-a000-000000000010', '00000000-0000-4000-a000-000000000058'),
  (194, '2025-11-24T23:15:38.427Z', '00000000-0000-4000-a000-000000000010', '00000000-0000-4000-a000-000000000001'),
  (195, '2025-11-23T23:15:38.427Z', '00000000-0000-4000-a000-000000000010', '00000000-0000-4000-a000-00000000000e'),
  (196, '2025-11-22T23:15:38.427Z', '00000000-0000-4000-a000-000000000010', '00000000-0000-4000-a000-00000000001b'),
  (197, '2025-11-21T23:15:38.427Z', '00000000-0000-4000-a000-000000000010', '00000000-0000-4000-a000-000000000028'),
  (198, '2025-11-20T23:15:38.427Z', '00000000-0000-4000-a000-000000000010', '00000000-0000-4000-a000-000000000035'),
  (199, '2025-11-19T23:15:38.427Z', '00000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-00000000000d'),
  (200, '2025-11-18T23:15:38.427Z', '00000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-00000000001a');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (201, '2025-11-17T23:15:38.427Z', '00000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-000000000027'),
  (202, '2025-11-16T23:15:38.427Z', '00000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-000000000034'),
  (203, '2025-11-15T23:15:38.427Z', '00000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-000000000041'),
  (204, '2025-11-14T23:15:38.427Z', '00000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-00000000004e'),
  (205, '2025-11-13T23:15:38.427Z', '00000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-00000000005b'),
  (206, '2025-11-12T23:15:38.427Z', '00000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-000000000004'),
  (207, '2025-11-11T23:15:38.427Z', '00000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-00000000001e'),
  (208, '2025-11-10T23:15:38.427Z', '00000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-00000000002b'),
  (209, '2025-11-09T23:15:38.427Z', '00000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-000000000038'),
  (210, '2025-11-08T23:15:38.427Z', '00000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-000000000045'),
  (211, '2025-11-07T23:15:38.427Z', '00000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-000000000052'),
  (212, '2025-11-06T23:15:38.427Z', '00000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-00000000005f'),
  (213, '2025-11-05T23:15:38.427Z', '00000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-000000000008'),
  (214, '2025-11-04T23:15:38.427Z', '00000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-000000000015'),
  (215, '2025-11-03T23:15:38.427Z', '00000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-000000000022'),
  (216, '2025-11-02T23:15:38.427Z', '00000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-00000000002f'),
  (217, '2025-11-01T23:15:38.427Z', '00000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-00000000003c'),
  (218, '2025-10-31T23:15:38.427Z', '00000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-000000000049'),
  (219, '2025-10-30T23:15:38.427Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-000000000014'),
  (220, '2025-10-29T23:15:38.427Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-000000000021'),
  (221, '2025-10-28T23:15:38.427Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-00000000002e'),
  (222, '2025-10-27T23:15:38.427Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-00000000003b'),
  (223, '2025-10-26T23:15:38.427Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-000000000048'),
  (224, '2025-10-25T23:15:38.427Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-000000000055'),
  (225, '2025-10-24T23:15:38.427Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-000000000062'),
  (226, '2025-10-23T23:15:38.427Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-00000000000b'),
  (227, '2025-10-22T23:15:38.427Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-000000000018'),
  (228, '2025-10-21T23:15:38.427Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-000000000025'),
  (229, '2025-10-20T23:15:38.427Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-000000000032'),
  (230, '2025-10-19T23:15:38.427Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-00000000003f'),
  (231, '2025-10-18T23:15:38.427Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-00000000004c'),
  (232, '2025-10-17T23:15:38.427Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-000000000059'),
  (233, '2025-10-16T23:15:38.429Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-000000000002'),
  (234, '2025-10-15T23:15:38.429Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-00000000000f'),
  (235, '2025-10-14T23:15:38.429Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-00000000001c'),
  (236, '2025-10-13T23:15:38.429Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-000000000029'),
  (237, '2025-10-12T23:15:38.429Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-000000000036'),
  (238, '2025-10-11T23:15:38.429Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-000000000043'),
  (239, '2025-10-10T23:15:38.429Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-000000000050'),
  (240, '2025-10-09T23:15:38.429Z', '00000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-00000000005d'),
  (241, '2025-10-08T23:15:38.429Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-00000000001b'),
  (242, '2025-10-07T23:15:38.429Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-000000000028'),
  (243, '2025-10-06T23:15:38.429Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-000000000035'),
  (244, '2025-10-05T23:15:38.429Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-000000000042'),
  (245, '2025-10-04T23:15:38.429Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-00000000004f'),
  (246, '2025-10-03T23:15:38.429Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-00000000005c'),
  (247, '2025-10-02T23:15:38.429Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-000000000005'),
  (248, '2025-10-01T23:15:38.429Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-000000000012'),
  (249, '2025-09-30T23:15:38.429Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-00000000001f'),
  (250, '2025-09-29T23:15:38.430Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-00000000002c');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (251, '2025-09-28T23:15:38.430Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-000000000039'),
  (252, '2025-09-27T23:15:38.430Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-000000000046'),
  (253, '2025-09-26T23:15:38.430Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-000000000053'),
  (254, '2025-09-25T23:15:38.430Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-000000000060'),
  (255, '2025-09-24T23:15:38.430Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-000000000009'),
  (256, '2025-09-23T23:15:38.430Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-000000000016'),
  (257, '2025-09-22T23:15:38.430Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-000000000023'),
  (258, '2025-09-21T23:15:38.430Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-000000000030'),
  (259, '2025-09-20T23:15:38.430Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-00000000003d'),
  (260, '2025-09-19T23:15:38.430Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-00000000004a'),
  (261, '2025-09-18T23:15:38.430Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-000000000057'),
  (262, '2025-09-17T23:15:38.430Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-000000000064'),
  (263, '2025-09-16T23:15:38.430Z', '00000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-00000000000d'),
  (264, '2025-09-15T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-000000000022'),
  (265, '2025-09-14T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-00000000002f'),
  (266, '2025-09-13T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-00000000003c'),
  (267, '2025-09-12T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-000000000049'),
  (268, '2025-09-11T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-000000000056'),
  (269, '2025-09-10T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-000000000063'),
  (270, '2025-09-09T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-00000000000c'),
  (271, '2025-09-08T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-000000000019'),
  (272, '2025-09-07T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-000000000026'),
  (273, '2025-09-06T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-000000000033'),
  (274, '2025-09-05T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-000000000040'),
  (275, '2025-09-04T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-00000000004d'),
  (276, '2025-09-03T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-00000000005a'),
  (277, '2025-09-02T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-000000000003'),
  (278, '2025-09-01T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-000000000010'),
  (279, '2025-08-31T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-00000000001d'),
  (280, '2025-08-30T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-00000000002a'),
  (281, '2025-08-29T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-000000000037'),
  (282, '2025-08-28T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-000000000044'),
  (283, '2025-08-27T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-000000000051'),
  (284, '2025-08-26T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-00000000005e'),
  (285, '2025-08-25T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-000000000007'),
  (286, '2025-08-24T23:15:38.430Z', '00000000-0000-4000-a000-000000000014', '00000000-0000-4000-a000-000000000021'),
  (287, '2025-08-23T23:15:38.430Z', '00000000-0000-4000-a000-000000000015', '00000000-0000-4000-a000-000000000029'),
  (288, '2025-08-22T23:15:38.430Z', '00000000-0000-4000-a000-000000000015', '00000000-0000-4000-a000-000000000036'),
  (289, '2025-08-21T23:15:38.430Z', '00000000-0000-4000-a000-000000000015', '00000000-0000-4000-a000-000000000043'),
  (290, '2025-08-20T23:15:38.430Z', '00000000-0000-4000-a000-000000000015', '00000000-0000-4000-a000-000000000050'),
  (291, '2025-08-19T23:15:38.430Z', '00000000-0000-4000-a000-000000000015', '00000000-0000-4000-a000-00000000005d'),
  (292, '2025-08-18T23:15:38.430Z', '00000000-0000-4000-a000-000000000016', '00000000-0000-4000-a000-000000000030'),
  (293, '2025-08-17T23:15:38.430Z', '00000000-0000-4000-a000-000000000016', '00000000-0000-4000-a000-00000000003d'),
  (294, '2025-08-16T23:15:38.430Z', '00000000-0000-4000-a000-000000000016', '00000000-0000-4000-a000-00000000004a'),
  (295, '2025-08-15T23:15:38.430Z', '00000000-0000-4000-a000-000000000016', '00000000-0000-4000-a000-000000000057'),
  (296, '2025-08-14T23:15:38.430Z', '00000000-0000-4000-a000-000000000016', '00000000-0000-4000-a000-000000000064'),
  (297, '2025-08-13T23:15:38.430Z', '00000000-0000-4000-a000-000000000016', '00000000-0000-4000-a000-00000000000d'),
  (298, '2025-08-12T23:15:38.430Z', '00000000-0000-4000-a000-000000000017', '00000000-0000-4000-a000-000000000037'),
  (299, '2025-08-11T23:15:38.430Z', '00000000-0000-4000-a000-000000000017', '00000000-0000-4000-a000-000000000044'),
  (300, '2025-08-10T23:15:38.430Z', '00000000-0000-4000-a000-000000000017', '00000000-0000-4000-a000-000000000051');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (301, '2025-08-09T23:15:38.430Z', '00000000-0000-4000-a000-000000000017', '00000000-0000-4000-a000-00000000005e'),
  (302, '2025-08-08T23:15:38.430Z', '00000000-0000-4000-a000-000000000017', '00000000-0000-4000-a000-000000000007'),
  (303, '2025-08-07T23:15:38.430Z', '00000000-0000-4000-a000-000000000017', '00000000-0000-4000-a000-000000000014'),
  (304, '2025-08-06T23:15:38.430Z', '00000000-0000-4000-a000-000000000017', '00000000-0000-4000-a000-000000000021'),
  (305, '2025-08-05T23:15:38.430Z', '00000000-0000-4000-a000-000000000018', '00000000-0000-4000-a000-00000000003e'),
  (306, '2025-08-04T23:15:38.430Z', '00000000-0000-4000-a000-000000000018', '00000000-0000-4000-a000-00000000004b'),
  (307, '2025-08-03T23:15:38.430Z', '00000000-0000-4000-a000-000000000018', '00000000-0000-4000-a000-000000000058'),
  (308, '2025-08-02T23:15:38.430Z', '00000000-0000-4000-a000-000000000018', '00000000-0000-4000-a000-000000000001'),
  (309, '2025-08-01T23:15:38.430Z', '00000000-0000-4000-a000-000000000018', '00000000-0000-4000-a000-00000000000e'),
  (310, '2025-07-31T23:15:38.430Z', '00000000-0000-4000-a000-000000000018', '00000000-0000-4000-a000-00000000001b'),
  (311, '2025-07-30T23:15:38.430Z', '00000000-0000-4000-a000-000000000018', '00000000-0000-4000-a000-000000000028'),
  (312, '2025-07-29T23:15:38.430Z', '00000000-0000-4000-a000-000000000018', '00000000-0000-4000-a000-000000000035'),
  (313, '2025-07-28T23:15:38.430Z', '00000000-0000-4000-a000-000000000019', '00000000-0000-4000-a000-000000000045'),
  (314, '2025-07-27T23:15:38.430Z', '00000000-0000-4000-a000-000000000019', '00000000-0000-4000-a000-000000000052'),
  (315, '2025-07-26T23:15:38.430Z', '00000000-0000-4000-a000-000000000019', '00000000-0000-4000-a000-00000000005f'),
  (316, '2025-07-25T23:15:38.430Z', '00000000-0000-4000-a000-000000000019', '00000000-0000-4000-a000-000000000008'),
  (317, '2025-07-24T23:15:38.430Z', '00000000-0000-4000-a000-000000000019', '00000000-0000-4000-a000-000000000015'),
  (318, '2025-07-23T23:15:38.430Z', '00000000-0000-4000-a000-000000000019', '00000000-0000-4000-a000-000000000022'),
  (319, '2025-07-22T23:15:38.430Z', '00000000-0000-4000-a000-000000000019', '00000000-0000-4000-a000-00000000002f'),
  (320, '2025-07-21T23:15:38.430Z', '00000000-0000-4000-a000-000000000019', '00000000-0000-4000-a000-00000000003c'),
  (321, '2025-07-20T23:15:38.430Z', '00000000-0000-4000-a000-000000000019', '00000000-0000-4000-a000-000000000049'),
  (322, '2025-07-19T23:15:38.430Z', '00000000-0000-4000-a000-00000000001a', '00000000-0000-4000-a000-00000000004c'),
  (323, '2025-07-18T23:15:38.430Z', '00000000-0000-4000-a000-00000000001a', '00000000-0000-4000-a000-000000000059'),
  (324, '2025-07-17T23:15:38.430Z', '00000000-0000-4000-a000-00000000001a', '00000000-0000-4000-a000-000000000002'),
  (325, '2025-07-16T23:15:38.430Z', '00000000-0000-4000-a000-00000000001a', '00000000-0000-4000-a000-00000000000f'),
  (326, '2025-07-15T23:15:38.430Z', '00000000-0000-4000-a000-00000000001a', '00000000-0000-4000-a000-00000000001c'),
  (327, '2025-07-14T23:15:38.430Z', '00000000-0000-4000-a000-00000000001a', '00000000-0000-4000-a000-000000000029'),
  (328, '2025-07-13T23:15:38.430Z', '00000000-0000-4000-a000-00000000001a', '00000000-0000-4000-a000-000000000036'),
  (329, '2025-07-12T23:15:38.430Z', '00000000-0000-4000-a000-00000000001a', '00000000-0000-4000-a000-000000000043'),
  (330, '2025-07-11T23:15:38.430Z', '00000000-0000-4000-a000-00000000001a', '00000000-0000-4000-a000-000000000050'),
  (331, '2025-07-10T23:15:38.430Z', '00000000-0000-4000-a000-00000000001a', '00000000-0000-4000-a000-00000000005d'),
  (332, '2025-07-09T23:15:38.430Z', '00000000-0000-4000-a000-00000000001b', '00000000-0000-4000-a000-000000000053'),
  (333, '2025-07-08T23:15:38.430Z', '00000000-0000-4000-a000-00000000001b', '00000000-0000-4000-a000-000000000060'),
  (334, '2025-07-07T23:15:38.430Z', '00000000-0000-4000-a000-00000000001b', '00000000-0000-4000-a000-000000000009'),
  (335, '2025-07-06T23:15:38.430Z', '00000000-0000-4000-a000-00000000001b', '00000000-0000-4000-a000-000000000016'),
  (336, '2025-07-05T23:15:38.430Z', '00000000-0000-4000-a000-00000000001b', '00000000-0000-4000-a000-000000000023'),
  (337, '2025-07-04T23:15:38.430Z', '00000000-0000-4000-a000-00000000001b', '00000000-0000-4000-a000-000000000030'),
  (338, '2025-07-03T23:15:38.430Z', '00000000-0000-4000-a000-00000000001b', '00000000-0000-4000-a000-00000000003d'),
  (339, '2025-07-02T23:15:38.430Z', '00000000-0000-4000-a000-00000000001b', '00000000-0000-4000-a000-00000000004a'),
  (340, '2025-07-01T23:15:38.430Z', '00000000-0000-4000-a000-00000000001b', '00000000-0000-4000-a000-000000000057'),
  (341, '2025-06-30T23:15:38.430Z', '00000000-0000-4000-a000-00000000001b', '00000000-0000-4000-a000-000000000064'),
  (342, '2025-06-29T23:15:38.430Z', '00000000-0000-4000-a000-00000000001b', '00000000-0000-4000-a000-00000000000d'),
  (343, '2025-06-28T23:15:38.430Z', '00000000-0000-4000-a000-00000000001c', '00000000-0000-4000-a000-00000000005a'),
  (344, '2025-06-27T23:15:38.430Z', '00000000-0000-4000-a000-00000000001c', '00000000-0000-4000-a000-000000000003'),
  (345, '2025-06-26T23:15:38.430Z', '00000000-0000-4000-a000-00000000001c', '00000000-0000-4000-a000-000000000010'),
  (346, '2025-06-25T23:15:38.430Z', '00000000-0000-4000-a000-00000000001c', '00000000-0000-4000-a000-00000000001d'),
  (347, '2025-06-24T23:15:38.430Z', '00000000-0000-4000-a000-00000000001c', '00000000-0000-4000-a000-00000000002a'),
  (348, '2025-06-23T23:15:38.430Z', '00000000-0000-4000-a000-00000000001c', '00000000-0000-4000-a000-000000000037'),
  (349, '2025-06-22T23:15:38.430Z', '00000000-0000-4000-a000-00000000001c', '00000000-0000-4000-a000-000000000044'),
  (350, '2025-06-21T23:15:38.430Z', '00000000-0000-4000-a000-00000000001c', '00000000-0000-4000-a000-000000000051');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (351, '2025-06-20T23:15:38.430Z', '00000000-0000-4000-a000-00000000001c', '00000000-0000-4000-a000-00000000005e'),
  (352, '2025-06-19T23:15:38.430Z', '00000000-0000-4000-a000-00000000001c', '00000000-0000-4000-a000-000000000007'),
  (353, '2025-06-18T23:15:38.430Z', '00000000-0000-4000-a000-00000000001c', '00000000-0000-4000-a000-000000000014'),
  (354, '2025-06-17T23:15:38.430Z', '00000000-0000-4000-a000-00000000001c', '00000000-0000-4000-a000-000000000021'),
  (355, '2025-06-16T23:15:38.430Z', '00000000-0000-4000-a000-00000000001d', '00000000-0000-4000-a000-000000000061'),
  (356, '2025-06-15T23:15:38.430Z', '00000000-0000-4000-a000-00000000001d', '00000000-0000-4000-a000-00000000000a'),
  (357, '2025-06-14T23:15:38.430Z', '00000000-0000-4000-a000-00000000001d', '00000000-0000-4000-a000-000000000017'),
  (358, '2025-06-13T23:15:38.430Z', '00000000-0000-4000-a000-00000000001d', '00000000-0000-4000-a000-000000000024'),
  (359, '2025-06-12T23:15:38.430Z', '00000000-0000-4000-a000-00000000001d', '00000000-0000-4000-a000-000000000031'),
  (360, '2025-06-11T23:15:38.430Z', '00000000-0000-4000-a000-00000000001d', '00000000-0000-4000-a000-00000000003e'),
  (361, '2025-06-10T23:15:38.430Z', '00000000-0000-4000-a000-00000000001d', '00000000-0000-4000-a000-00000000004b'),
  (362, '2025-06-09T23:15:38.430Z', '00000000-0000-4000-a000-00000000001d', '00000000-0000-4000-a000-000000000058'),
  (363, '2025-06-08T23:15:38.430Z', '00000000-0000-4000-a000-00000000001d', '00000000-0000-4000-a000-000000000001'),
  (364, '2025-06-07T23:15:38.430Z', '00000000-0000-4000-a000-00000000001d', '00000000-0000-4000-a000-00000000000e'),
  (365, '2026-06-06T23:15:38.430Z', '00000000-0000-4000-a000-00000000001d', '00000000-0000-4000-a000-00000000001b'),
  (366, '2026-06-05T23:15:38.430Z', '00000000-0000-4000-a000-00000000001d', '00000000-0000-4000-a000-000000000028'),
  (367, '2026-06-04T23:15:38.430Z', '00000000-0000-4000-a000-00000000001d', '00000000-0000-4000-a000-000000000035'),
  (368, '2026-06-03T23:15:38.430Z', '00000000-0000-4000-a000-00000000001e', '00000000-0000-4000-a000-000000000004'),
  (369, '2026-06-02T23:15:38.430Z', '00000000-0000-4000-a000-00000000001e', '00000000-0000-4000-a000-000000000011'),
  (370, '2026-06-01T23:15:38.430Z', '00000000-0000-4000-a000-00000000001e', '00000000-0000-4000-a000-00000000002b'),
  (371, '2026-05-31T23:15:38.430Z', '00000000-0000-4000-a000-00000000001e', '00000000-0000-4000-a000-000000000038'),
  (372, '2026-05-30T23:15:38.430Z', '00000000-0000-4000-a000-00000000001e', '00000000-0000-4000-a000-000000000045'),
  (373, '2026-05-29T23:15:38.430Z', '00000000-0000-4000-a000-00000000001e', '00000000-0000-4000-a000-000000000052'),
  (374, '2026-05-28T23:15:38.430Z', '00000000-0000-4000-a000-00000000001e', '00000000-0000-4000-a000-00000000005f'),
  (375, '2026-05-27T23:15:38.430Z', '00000000-0000-4000-a000-00000000001e', '00000000-0000-4000-a000-000000000008'),
  (376, '2026-05-26T23:15:38.430Z', '00000000-0000-4000-a000-00000000001e', '00000000-0000-4000-a000-000000000015'),
  (377, '2026-05-25T23:15:38.430Z', '00000000-0000-4000-a000-00000000001e', '00000000-0000-4000-a000-000000000022'),
  (378, '2026-05-24T23:15:38.430Z', '00000000-0000-4000-a000-00000000001e', '00000000-0000-4000-a000-00000000002f'),
  (379, '2026-05-23T23:15:38.430Z', '00000000-0000-4000-a000-00000000001e', '00000000-0000-4000-a000-00000000003c'),
  (380, '2026-05-22T23:15:38.430Z', '00000000-0000-4000-a000-00000000001e', '00000000-0000-4000-a000-000000000049'),
  (381, '2026-05-21T23:15:38.430Z', '00000000-0000-4000-a000-00000000001f', '00000000-0000-4000-a000-00000000000b'),
  (382, '2026-05-20T23:15:38.430Z', '00000000-0000-4000-a000-00000000001f', '00000000-0000-4000-a000-000000000018'),
  (383, '2026-05-19T23:15:38.430Z', '00000000-0000-4000-a000-00000000001f', '00000000-0000-4000-a000-000000000025'),
  (384, '2026-05-18T23:15:38.430Z', '00000000-0000-4000-a000-00000000001f', '00000000-0000-4000-a000-000000000032'),
  (385, '2026-05-17T23:15:38.430Z', '00000000-0000-4000-a000-00000000001f', '00000000-0000-4000-a000-00000000003f'),
  (386, '2026-05-16T23:15:38.430Z', '00000000-0000-4000-a000-00000000001f', '00000000-0000-4000-a000-00000000004c'),
  (387, '2026-05-15T23:15:38.430Z', '00000000-0000-4000-a000-00000000001f', '00000000-0000-4000-a000-000000000059'),
  (388, '2026-05-14T23:15:38.430Z', '00000000-0000-4000-a000-00000000001f', '00000000-0000-4000-a000-000000000002'),
  (389, '2026-05-13T23:15:38.430Z', '00000000-0000-4000-a000-00000000001f', '00000000-0000-4000-a000-00000000000f'),
  (390, '2026-05-12T23:15:38.430Z', '00000000-0000-4000-a000-00000000001f', '00000000-0000-4000-a000-00000000001c'),
  (391, '2026-05-11T23:15:38.430Z', '00000000-0000-4000-a000-00000000001f', '00000000-0000-4000-a000-000000000029'),
  (392, '2026-05-10T23:15:38.430Z', '00000000-0000-4000-a000-00000000001f', '00000000-0000-4000-a000-000000000036'),
  (393, '2026-05-09T23:15:38.430Z', '00000000-0000-4000-a000-00000000001f', '00000000-0000-4000-a000-000000000043'),
  (394, '2026-05-08T23:15:38.430Z', '00000000-0000-4000-a000-00000000001f', '00000000-0000-4000-a000-000000000050'),
  (395, '2026-05-07T23:15:38.430Z', '00000000-0000-4000-a000-00000000001f', '00000000-0000-4000-a000-00000000005d'),
  (396, '2026-05-06T23:15:38.430Z', '00000000-0000-4000-a000-000000000020', '00000000-0000-4000-a000-000000000012'),
  (397, '2026-05-05T23:15:38.430Z', '00000000-0000-4000-a000-000000000020', '00000000-0000-4000-a000-00000000001f'),
  (398, '2026-05-04T23:15:38.430Z', '00000000-0000-4000-a000-000000000020', '00000000-0000-4000-a000-00000000002c'),
  (399, '2026-05-03T23:15:38.430Z', '00000000-0000-4000-a000-000000000020', '00000000-0000-4000-a000-000000000039'),
  (400, '2026-05-02T23:15:38.430Z', '00000000-0000-4000-a000-000000000020', '00000000-0000-4000-a000-000000000046');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (401, '2026-05-01T23:15:38.430Z', '00000000-0000-4000-a000-000000000020', '00000000-0000-4000-a000-000000000053'),
  (402, '2026-04-30T23:15:38.430Z', '00000000-0000-4000-a000-000000000020', '00000000-0000-4000-a000-000000000060'),
  (403, '2026-04-29T23:15:38.430Z', '00000000-0000-4000-a000-000000000020', '00000000-0000-4000-a000-000000000009'),
  (404, '2026-04-28T23:15:38.430Z', '00000000-0000-4000-a000-000000000020', '00000000-0000-4000-a000-000000000016'),
  (405, '2026-04-27T23:15:38.430Z', '00000000-0000-4000-a000-000000000020', '00000000-0000-4000-a000-000000000023'),
  (406, '2026-04-26T23:15:38.430Z', '00000000-0000-4000-a000-000000000020', '00000000-0000-4000-a000-000000000030'),
  (407, '2026-04-25T23:15:38.430Z', '00000000-0000-4000-a000-000000000020', '00000000-0000-4000-a000-00000000003d'),
  (408, '2026-04-24T23:15:38.430Z', '00000000-0000-4000-a000-000000000020', '00000000-0000-4000-a000-00000000004a'),
  (409, '2026-04-23T23:15:38.430Z', '00000000-0000-4000-a000-000000000020', '00000000-0000-4000-a000-000000000057'),
  (410, '2026-04-22T23:15:38.430Z', '00000000-0000-4000-a000-000000000020', '00000000-0000-4000-a000-000000000064'),
  (411, '2026-04-21T23:15:38.430Z', '00000000-0000-4000-a000-000000000020', '00000000-0000-4000-a000-00000000000d'),
  (412, '2026-04-20T23:15:38.430Z', '00000000-0000-4000-a000-000000000021', '00000000-0000-4000-a000-000000000019'),
  (413, '2026-04-19T23:15:38.430Z', '00000000-0000-4000-a000-000000000021', '00000000-0000-4000-a000-000000000026'),
  (414, '2026-04-18T23:15:38.430Z', '00000000-0000-4000-a000-000000000021', '00000000-0000-4000-a000-000000000033'),
  (415, '2026-04-17T23:15:38.430Z', '00000000-0000-4000-a000-000000000021', '00000000-0000-4000-a000-000000000040'),
  (416, '2026-04-16T23:15:38.430Z', '00000000-0000-4000-a000-000000000021', '00000000-0000-4000-a000-00000000004d'),
  (417, '2026-04-15T23:15:38.430Z', '00000000-0000-4000-a000-000000000021', '00000000-0000-4000-a000-00000000005a'),
  (418, '2026-04-14T23:15:38.430Z', '00000000-0000-4000-a000-000000000021', '00000000-0000-4000-a000-000000000003'),
  (419, '2026-04-13T23:15:38.430Z', '00000000-0000-4000-a000-000000000021', '00000000-0000-4000-a000-000000000010'),
  (420, '2026-04-12T23:15:38.431Z', '00000000-0000-4000-a000-000000000021', '00000000-0000-4000-a000-00000000001d'),
  (421, '2026-04-11T23:15:38.431Z', '00000000-0000-4000-a000-000000000021', '00000000-0000-4000-a000-00000000002a'),
  (422, '2026-04-10T23:15:38.431Z', '00000000-0000-4000-a000-000000000021', '00000000-0000-4000-a000-000000000037'),
  (423, '2026-04-09T23:15:38.431Z', '00000000-0000-4000-a000-000000000021', '00000000-0000-4000-a000-000000000044'),
  (424, '2026-04-08T23:15:38.431Z', '00000000-0000-4000-a000-000000000021', '00000000-0000-4000-a000-000000000051'),
  (425, '2026-04-07T23:15:38.431Z', '00000000-0000-4000-a000-000000000021', '00000000-0000-4000-a000-00000000005e'),
  (426, '2026-04-06T23:15:38.431Z', '00000000-0000-4000-a000-000000000021', '00000000-0000-4000-a000-000000000007'),
  (427, '2026-04-05T23:15:38.431Z', '00000000-0000-4000-a000-000000000021', '00000000-0000-4000-a000-000000000014'),
  (428, '2026-04-04T23:15:38.431Z', '00000000-0000-4000-a000-000000000022', '00000000-0000-4000-a000-000000000020'),
  (429, '2026-04-03T23:15:38.431Z', '00000000-0000-4000-a000-000000000022', '00000000-0000-4000-a000-00000000002d'),
  (430, '2026-04-02T23:15:38.432Z', '00000000-0000-4000-a000-000000000022', '00000000-0000-4000-a000-00000000003a'),
  (431, '2026-04-01T23:15:38.432Z', '00000000-0000-4000-a000-000000000022', '00000000-0000-4000-a000-000000000047'),
  (432, '2026-03-31T23:15:38.432Z', '00000000-0000-4000-a000-000000000022', '00000000-0000-4000-a000-000000000054'),
  (433, '2026-03-30T23:15:38.432Z', '00000000-0000-4000-a000-000000000022', '00000000-0000-4000-a000-000000000061'),
  (434, '2026-03-29T23:15:38.432Z', '00000000-0000-4000-a000-000000000022', '00000000-0000-4000-a000-00000000000a'),
  (435, '2026-03-28T23:15:38.432Z', '00000000-0000-4000-a000-000000000022', '00000000-0000-4000-a000-000000000017'),
  (436, '2026-03-27T23:15:38.432Z', '00000000-0000-4000-a000-000000000022', '00000000-0000-4000-a000-000000000024'),
  (437, '2026-03-26T23:15:38.432Z', '00000000-0000-4000-a000-000000000022', '00000000-0000-4000-a000-000000000031'),
  (438, '2026-03-25T23:15:38.432Z', '00000000-0000-4000-a000-000000000022', '00000000-0000-4000-a000-00000000003e'),
  (439, '2026-03-24T23:15:38.432Z', '00000000-0000-4000-a000-000000000022', '00000000-0000-4000-a000-00000000004b'),
  (440, '2026-03-23T23:15:38.432Z', '00000000-0000-4000-a000-000000000022', '00000000-0000-4000-a000-000000000058'),
  (441, '2026-03-22T23:15:38.432Z', '00000000-0000-4000-a000-000000000022', '00000000-0000-4000-a000-000000000001'),
  (442, '2026-03-21T23:15:38.432Z', '00000000-0000-4000-a000-000000000022', '00000000-0000-4000-a000-00000000000e'),
  (443, '2026-03-20T23:15:38.432Z', '00000000-0000-4000-a000-000000000022', '00000000-0000-4000-a000-00000000001b'),
  (444, '2026-03-19T23:15:38.432Z', '00000000-0000-4000-a000-000000000022', '00000000-0000-4000-a000-000000000028'),
  (445, '2026-03-18T23:15:38.432Z', '00000000-0000-4000-a000-000000000022', '00000000-0000-4000-a000-000000000035'),
  (446, '2026-03-17T23:15:38.432Z', '00000000-0000-4000-a000-000000000023', '00000000-0000-4000-a000-000000000027'),
  (447, '2026-03-16T23:15:38.432Z', '00000000-0000-4000-a000-000000000023', '00000000-0000-4000-a000-000000000034'),
  (448, '2026-03-15T23:15:38.432Z', '00000000-0000-4000-a000-000000000023', '00000000-0000-4000-a000-000000000041'),
  (449, '2026-03-14T23:15:38.432Z', '00000000-0000-4000-a000-000000000023', '00000000-0000-4000-a000-00000000004e'),
  (450, '2026-03-13T23:15:38.432Z', '00000000-0000-4000-a000-000000000023', '00000000-0000-4000-a000-00000000005b');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (451, '2026-03-12T23:15:38.432Z', '00000000-0000-4000-a000-000000000023', '00000000-0000-4000-a000-000000000004'),
  (452, '2026-03-11T23:15:38.432Z', '00000000-0000-4000-a000-000000000023', '00000000-0000-4000-a000-000000000011'),
  (453, '2026-03-10T23:15:38.432Z', '00000000-0000-4000-a000-000000000023', '00000000-0000-4000-a000-00000000001e'),
  (454, '2026-03-09T23:15:38.432Z', '00000000-0000-4000-a000-000000000023', '00000000-0000-4000-a000-00000000002b'),
  (455, '2026-03-08T23:15:38.432Z', '00000000-0000-4000-a000-000000000023', '00000000-0000-4000-a000-000000000038'),
  (456, '2026-03-07T23:15:38.432Z', '00000000-0000-4000-a000-000000000023', '00000000-0000-4000-a000-000000000045'),
  (457, '2026-03-06T23:15:38.432Z', '00000000-0000-4000-a000-000000000023', '00000000-0000-4000-a000-000000000052'),
  (458, '2026-03-05T23:15:38.432Z', '00000000-0000-4000-a000-000000000023', '00000000-0000-4000-a000-00000000005f'),
  (459, '2026-03-04T23:15:38.432Z', '00000000-0000-4000-a000-000000000023', '00000000-0000-4000-a000-000000000008'),
  (460, '2026-03-03T23:15:38.432Z', '00000000-0000-4000-a000-000000000023', '00000000-0000-4000-a000-000000000015'),
  (461, '2026-03-02T23:15:38.432Z', '00000000-0000-4000-a000-000000000023', '00000000-0000-4000-a000-000000000022'),
  (462, '2026-03-01T23:15:38.432Z', '00000000-0000-4000-a000-000000000023', '00000000-0000-4000-a000-00000000002f'),
  (463, '2026-02-28T23:15:38.432Z', '00000000-0000-4000-a000-000000000023', '00000000-0000-4000-a000-00000000003c'),
  (464, '2026-02-27T23:15:38.432Z', '00000000-0000-4000-a000-000000000023', '00000000-0000-4000-a000-000000000049'),
  (465, '2026-02-26T23:15:38.432Z', '00000000-0000-4000-a000-000000000024', '00000000-0000-4000-a000-00000000002e'),
  (466, '2026-02-25T23:15:38.432Z', '00000000-0000-4000-a000-000000000024', '00000000-0000-4000-a000-00000000003b'),
  (467, '2026-02-24T23:15:38.432Z', '00000000-0000-4000-a000-000000000024', '00000000-0000-4000-a000-000000000048'),
  (468, '2026-02-23T23:15:38.432Z', '00000000-0000-4000-a000-000000000024', '00000000-0000-4000-a000-000000000055'),
  (469, '2026-02-22T23:15:38.432Z', '00000000-0000-4000-a000-000000000024', '00000000-0000-4000-a000-000000000062'),
  (470, '2026-02-21T23:15:38.432Z', '00000000-0000-4000-a000-000000000024', '00000000-0000-4000-a000-00000000000b'),
  (471, '2026-02-20T23:15:38.432Z', '00000000-0000-4000-a000-000000000024', '00000000-0000-4000-a000-000000000018'),
  (472, '2026-02-19T23:15:38.432Z', '00000000-0000-4000-a000-000000000024', '00000000-0000-4000-a000-000000000025'),
  (473, '2026-02-18T23:15:38.432Z', '00000000-0000-4000-a000-000000000024', '00000000-0000-4000-a000-000000000032'),
  (474, '2026-02-17T23:15:38.432Z', '00000000-0000-4000-a000-000000000024', '00000000-0000-4000-a000-00000000003f'),
  (475, '2026-02-16T23:15:38.432Z', '00000000-0000-4000-a000-000000000024', '00000000-0000-4000-a000-00000000004c'),
  (476, '2026-02-15T23:15:38.432Z', '00000000-0000-4000-a000-000000000024', '00000000-0000-4000-a000-000000000059'),
  (477, '2026-02-14T23:15:38.432Z', '00000000-0000-4000-a000-000000000024', '00000000-0000-4000-a000-000000000002'),
  (478, '2026-02-13T23:15:38.432Z', '00000000-0000-4000-a000-000000000024', '00000000-0000-4000-a000-00000000000f'),
  (479, '2026-02-12T23:15:38.432Z', '00000000-0000-4000-a000-000000000024', '00000000-0000-4000-a000-00000000001c'),
  (480, '2026-02-11T23:15:38.432Z', '00000000-0000-4000-a000-000000000024', '00000000-0000-4000-a000-000000000029'),
  (481, '2026-02-10T23:15:38.432Z', '00000000-0000-4000-a000-000000000024', '00000000-0000-4000-a000-000000000036'),
  (482, '2026-02-09T23:15:38.432Z', '00000000-0000-4000-a000-000000000024', '00000000-0000-4000-a000-000000000043'),
  (483, '2026-02-08T23:15:38.432Z', '00000000-0000-4000-a000-000000000024', '00000000-0000-4000-a000-000000000050'),
  (484, '2026-02-07T23:15:38.432Z', '00000000-0000-4000-a000-000000000024', '00000000-0000-4000-a000-00000000005d'),
  (485, '2026-02-06T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-000000000035'),
  (486, '2026-02-05T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-000000000042'),
  (487, '2026-02-04T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-00000000004f'),
  (488, '2026-02-03T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-00000000005c'),
  (489, '2026-02-02T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-000000000005'),
  (490, '2026-02-01T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-000000000012'),
  (491, '2026-01-31T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-00000000001f'),
  (492, '2026-01-30T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-00000000002c'),
  (493, '2026-01-29T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-000000000039'),
  (494, '2026-01-28T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-000000000046'),
  (495, '2026-01-27T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-000000000053'),
  (496, '2026-01-26T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-000000000060'),
  (497, '2026-01-25T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-000000000009'),
  (498, '2026-01-24T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-000000000016'),
  (499, '2026-01-23T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-000000000023'),
  (500, '2026-01-22T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-000000000030');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (501, '2026-01-21T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-00000000003d'),
  (502, '2026-01-20T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-00000000004a'),
  (503, '2026-01-19T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-000000000057'),
  (504, '2026-01-18T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-000000000064'),
  (505, '2026-01-17T23:15:38.432Z', '00000000-0000-4000-a000-000000000025', '00000000-0000-4000-a000-00000000000d'),
  (506, '2026-01-16T23:15:38.432Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-00000000003c'),
  (507, '2026-01-15T23:15:38.432Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-000000000049'),
  (508, '2026-01-14T23:15:38.432Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-000000000056'),
  (509, '2026-01-13T23:15:38.432Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-000000000063'),
  (510, '2026-01-12T23:15:38.432Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-00000000000c'),
  (511, '2026-01-11T23:15:38.432Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-000000000019'),
  (512, '2026-01-10T23:15:38.432Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-000000000033'),
  (513, '2026-01-09T23:15:38.433Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-000000000040'),
  (514, '2026-01-08T23:15:38.433Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-00000000004d'),
  (515, '2026-01-07T23:15:38.433Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-00000000005a'),
  (516, '2026-01-06T23:15:38.433Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-000000000003'),
  (517, '2026-01-05T23:15:38.433Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-000000000010'),
  (518, '2026-01-04T23:15:38.433Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-00000000001d'),
  (519, '2026-01-03T23:15:38.433Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-00000000002a'),
  (520, '2026-01-02T23:15:38.433Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-000000000037'),
  (521, '2026-01-01T23:15:38.433Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-000000000044'),
  (522, '2025-12-31T23:15:38.433Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-000000000051'),
  (523, '2025-12-30T23:15:38.433Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-00000000005e'),
  (524, '2025-12-29T23:15:38.433Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-000000000007'),
  (525, '2025-12-28T23:15:38.433Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-000000000014'),
  (526, '2025-12-27T23:15:38.433Z', '00000000-0000-4000-a000-000000000026', '00000000-0000-4000-a000-000000000021'),
  (527, '2025-12-26T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-000000000043'),
  (528, '2025-12-25T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-000000000050'),
  (529, '2025-12-24T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-00000000005d'),
  (530, '2025-12-23T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-000000000006'),
  (531, '2025-12-22T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-000000000013'),
  (532, '2025-12-21T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-000000000020'),
  (533, '2025-12-20T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-00000000002d'),
  (534, '2025-12-19T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-00000000003a'),
  (535, '2025-12-18T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-000000000047'),
  (536, '2025-12-17T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-000000000054'),
  (537, '2025-12-16T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-000000000061'),
  (538, '2025-12-15T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-00000000000a'),
  (539, '2025-12-14T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-000000000017'),
  (540, '2025-12-13T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-000000000024'),
  (541, '2025-12-12T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-000000000031'),
  (542, '2025-12-11T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-00000000003e'),
  (543, '2025-12-10T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-00000000004b'),
  (544, '2025-12-09T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-000000000058'),
  (545, '2025-12-08T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-000000000001'),
  (546, '2025-12-07T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-00000000000e'),
  (547, '2025-12-06T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-00000000001b'),
  (548, '2025-12-05T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-000000000028'),
  (549, '2025-12-04T23:15:38.433Z', '00000000-0000-4000-a000-000000000027', '00000000-0000-4000-a000-000000000035'),
  (550, '2025-12-03T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-00000000004a');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (551, '2025-12-02T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-000000000057'),
  (552, '2025-12-01T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-000000000064'),
  (553, '2025-11-30T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-00000000000d'),
  (554, '2025-11-29T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-00000000001a'),
  (555, '2025-11-28T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-000000000027'),
  (556, '2025-11-27T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-000000000034'),
  (557, '2025-11-26T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-000000000041'),
  (558, '2025-11-25T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-00000000004e'),
  (559, '2025-11-24T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-00000000005b'),
  (560, '2025-11-23T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-000000000004'),
  (561, '2025-11-22T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-000000000011'),
  (562, '2025-11-21T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-00000000001e'),
  (563, '2025-11-20T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-00000000002b'),
  (564, '2025-11-19T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-000000000038'),
  (565, '2025-11-18T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-000000000045'),
  (566, '2025-11-17T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-000000000052'),
  (567, '2025-11-16T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-00000000005f'),
  (568, '2025-11-15T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-000000000008'),
  (569, '2025-11-14T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-000000000015'),
  (570, '2025-11-13T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-000000000022'),
  (571, '2025-11-12T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-00000000002f'),
  (572, '2025-11-11T23:15:38.433Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-00000000003c'),
  (573, '2025-11-10T23:15:38.434Z', '00000000-0000-4000-a000-000000000028', '00000000-0000-4000-a000-000000000049'),
  (574, '2025-11-09T23:15:38.434Z', '00000000-0000-4000-a000-000000000029', '00000000-0000-4000-a000-000000000051'),
  (575, '2025-11-08T23:15:38.434Z', '00000000-0000-4000-a000-000000000029', '00000000-0000-4000-a000-00000000005e'),
  (576, '2025-11-07T23:15:38.434Z', '00000000-0000-4000-a000-000000000029', '00000000-0000-4000-a000-000000000007'),
  (577, '2025-11-06T23:15:38.434Z', '00000000-0000-4000-a000-000000000029', '00000000-0000-4000-a000-000000000014'),
  (578, '2025-11-05T23:15:38.434Z', '00000000-0000-4000-a000-000000000029', '00000000-0000-4000-a000-000000000021'),
  (579, '2025-11-04T23:15:38.434Z', '00000000-0000-4000-a000-00000000002a', '00000000-0000-4000-a000-000000000058'),
  (580, '2025-11-03T23:15:38.434Z', '00000000-0000-4000-a000-00000000002a', '00000000-0000-4000-a000-000000000001'),
  (581, '2025-11-02T23:15:38.434Z', '00000000-0000-4000-a000-00000000002a', '00000000-0000-4000-a000-00000000000e'),
  (582, '2025-11-01T23:15:38.434Z', '00000000-0000-4000-a000-00000000002a', '00000000-0000-4000-a000-00000000001b'),
  (583, '2025-10-31T23:15:38.434Z', '00000000-0000-4000-a000-00000000002a', '00000000-0000-4000-a000-000000000028'),
  (584, '2025-10-30T23:15:38.434Z', '00000000-0000-4000-a000-00000000002a', '00000000-0000-4000-a000-000000000035'),
  (585, '2025-10-29T23:15:38.434Z', '00000000-0000-4000-a000-00000000002b', '00000000-0000-4000-a000-00000000005f'),
  (586, '2025-10-28T23:15:38.434Z', '00000000-0000-4000-a000-00000000002b', '00000000-0000-4000-a000-000000000008'),
  (587, '2025-10-27T23:15:38.434Z', '00000000-0000-4000-a000-00000000002b', '00000000-0000-4000-a000-000000000015'),
  (588, '2025-10-26T23:15:38.434Z', '00000000-0000-4000-a000-00000000002b', '00000000-0000-4000-a000-000000000022'),
  (589, '2025-10-25T23:15:38.434Z', '00000000-0000-4000-a000-00000000002b', '00000000-0000-4000-a000-00000000002f'),
  (590, '2025-10-24T23:15:38.434Z', '00000000-0000-4000-a000-00000000002b', '00000000-0000-4000-a000-00000000003c'),
  (591, '2025-10-23T23:15:38.434Z', '00000000-0000-4000-a000-00000000002b', '00000000-0000-4000-a000-000000000049'),
  (592, '2025-10-22T23:15:38.434Z', '00000000-0000-4000-a000-00000000002c', '00000000-0000-4000-a000-000000000002'),
  (593, '2025-10-21T23:15:38.434Z', '00000000-0000-4000-a000-00000000002c', '00000000-0000-4000-a000-00000000000f'),
  (594, '2025-10-20T23:15:38.434Z', '00000000-0000-4000-a000-00000000002c', '00000000-0000-4000-a000-00000000001c'),
  (595, '2025-10-19T23:15:38.434Z', '00000000-0000-4000-a000-00000000002c', '00000000-0000-4000-a000-000000000029'),
  (596, '2025-10-18T23:15:38.434Z', '00000000-0000-4000-a000-00000000002c', '00000000-0000-4000-a000-000000000036'),
  (597, '2025-10-17T23:15:38.434Z', '00000000-0000-4000-a000-00000000002c', '00000000-0000-4000-a000-000000000043'),
  (598, '2025-10-16T23:15:38.434Z', '00000000-0000-4000-a000-00000000002c', '00000000-0000-4000-a000-000000000050'),
  (599, '2025-10-15T23:15:38.434Z', '00000000-0000-4000-a000-00000000002c', '00000000-0000-4000-a000-00000000005d'),
  (600, '2025-10-14T23:15:38.434Z', '00000000-0000-4000-a000-00000000002d', '00000000-0000-4000-a000-000000000009');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (601, '2025-10-13T23:15:38.434Z', '00000000-0000-4000-a000-00000000002d', '00000000-0000-4000-a000-000000000016'),
  (602, '2025-10-12T23:15:38.434Z', '00000000-0000-4000-a000-00000000002d', '00000000-0000-4000-a000-000000000023'),
  (603, '2025-10-11T23:15:38.434Z', '00000000-0000-4000-a000-00000000002d', '00000000-0000-4000-a000-000000000030'),
  (604, '2025-10-10T23:15:38.434Z', '00000000-0000-4000-a000-00000000002d', '00000000-0000-4000-a000-00000000003d'),
  (605, '2025-10-09T23:15:38.434Z', '00000000-0000-4000-a000-00000000002d', '00000000-0000-4000-a000-00000000004a'),
  (606, '2025-10-08T23:15:38.434Z', '00000000-0000-4000-a000-00000000002d', '00000000-0000-4000-a000-000000000057'),
  (607, '2025-10-07T23:15:38.434Z', '00000000-0000-4000-a000-00000000002d', '00000000-0000-4000-a000-000000000064'),
  (608, '2025-10-06T23:15:38.434Z', '00000000-0000-4000-a000-00000000002d', '00000000-0000-4000-a000-00000000000d'),
  (609, '2025-10-05T23:15:38.434Z', '00000000-0000-4000-a000-00000000002e', '00000000-0000-4000-a000-000000000010'),
  (610, '2025-10-04T23:15:38.434Z', '00000000-0000-4000-a000-00000000002e', '00000000-0000-4000-a000-00000000001d'),
  (611, '2025-10-03T23:15:38.434Z', '00000000-0000-4000-a000-00000000002e', '00000000-0000-4000-a000-00000000002a'),
  (612, '2025-10-02T23:15:38.434Z', '00000000-0000-4000-a000-00000000002e', '00000000-0000-4000-a000-000000000037'),
  (613, '2025-10-01T23:15:38.434Z', '00000000-0000-4000-a000-00000000002e', '00000000-0000-4000-a000-000000000044'),
  (614, '2025-09-30T23:15:38.434Z', '00000000-0000-4000-a000-00000000002e', '00000000-0000-4000-a000-000000000051'),
  (615, '2025-09-29T23:15:38.434Z', '00000000-0000-4000-a000-00000000002e', '00000000-0000-4000-a000-00000000005e'),
  (616, '2025-09-28T23:15:38.434Z', '00000000-0000-4000-a000-00000000002e', '00000000-0000-4000-a000-000000000007'),
  (617, '2025-09-27T23:15:38.434Z', '00000000-0000-4000-a000-00000000002e', '00000000-0000-4000-a000-000000000014'),
  (618, '2025-09-26T23:15:38.434Z', '00000000-0000-4000-a000-00000000002e', '00000000-0000-4000-a000-000000000021'),
  (619, '2025-09-25T23:15:38.434Z', '00000000-0000-4000-a000-00000000002f', '00000000-0000-4000-a000-000000000017'),
  (620, '2025-09-24T23:15:38.434Z', '00000000-0000-4000-a000-00000000002f', '00000000-0000-4000-a000-000000000024'),
  (621, '2025-09-23T23:15:38.434Z', '00000000-0000-4000-a000-00000000002f', '00000000-0000-4000-a000-000000000031'),
  (622, '2025-09-22T23:15:38.434Z', '00000000-0000-4000-a000-00000000002f', '00000000-0000-4000-a000-00000000003e'),
  (623, '2025-09-21T23:15:38.434Z', '00000000-0000-4000-a000-00000000002f', '00000000-0000-4000-a000-00000000004b'),
  (624, '2025-09-20T23:15:38.434Z', '00000000-0000-4000-a000-00000000002f', '00000000-0000-4000-a000-000000000058'),
  (625, '2025-09-19T23:15:38.434Z', '00000000-0000-4000-a000-00000000002f', '00000000-0000-4000-a000-000000000001'),
  (626, '2025-09-18T23:15:38.434Z', '00000000-0000-4000-a000-00000000002f', '00000000-0000-4000-a000-00000000000e'),
  (627, '2025-09-17T23:15:38.434Z', '00000000-0000-4000-a000-00000000002f', '00000000-0000-4000-a000-00000000001b'),
  (628, '2025-09-16T23:15:38.434Z', '00000000-0000-4000-a000-00000000002f', '00000000-0000-4000-a000-000000000028'),
  (629, '2025-09-15T23:15:38.434Z', '00000000-0000-4000-a000-00000000002f', '00000000-0000-4000-a000-000000000035'),
  (630, '2025-09-14T23:15:38.435Z', '00000000-0000-4000-a000-000000000030', '00000000-0000-4000-a000-00000000001e'),
  (631, '2025-09-13T23:15:38.435Z', '00000000-0000-4000-a000-000000000030', '00000000-0000-4000-a000-00000000002b'),
  (632, '2025-09-12T23:15:38.435Z', '00000000-0000-4000-a000-000000000030', '00000000-0000-4000-a000-000000000038'),
  (633, '2025-09-11T23:15:38.435Z', '00000000-0000-4000-a000-000000000030', '00000000-0000-4000-a000-000000000045'),
  (634, '2025-09-10T23:15:38.435Z', '00000000-0000-4000-a000-000000000030', '00000000-0000-4000-a000-000000000052'),
  (635, '2025-09-09T23:15:38.435Z', '00000000-0000-4000-a000-000000000030', '00000000-0000-4000-a000-00000000005f'),
  (636, '2025-09-08T23:15:38.435Z', '00000000-0000-4000-a000-000000000030', '00000000-0000-4000-a000-000000000008'),
  (637, '2025-09-07T23:15:38.435Z', '00000000-0000-4000-a000-000000000030', '00000000-0000-4000-a000-000000000015'),
  (638, '2025-09-06T23:15:38.435Z', '00000000-0000-4000-a000-000000000030', '00000000-0000-4000-a000-000000000022'),
  (639, '2025-09-05T23:15:38.435Z', '00000000-0000-4000-a000-000000000030', '00000000-0000-4000-a000-00000000002f'),
  (640, '2025-09-04T23:15:38.435Z', '00000000-0000-4000-a000-000000000030', '00000000-0000-4000-a000-00000000003c'),
  (641, '2025-09-03T23:15:38.435Z', '00000000-0000-4000-a000-000000000030', '00000000-0000-4000-a000-000000000049'),
  (642, '2025-09-02T23:15:38.435Z', '00000000-0000-4000-a000-000000000031', '00000000-0000-4000-a000-000000000025'),
  (643, '2025-09-01T23:15:38.435Z', '00000000-0000-4000-a000-000000000031', '00000000-0000-4000-a000-000000000032'),
  (644, '2025-08-31T23:15:38.435Z', '00000000-0000-4000-a000-000000000031', '00000000-0000-4000-a000-00000000003f'),
  (645, '2025-08-30T23:15:38.435Z', '00000000-0000-4000-a000-000000000031', '00000000-0000-4000-a000-00000000004c'),
  (646, '2025-08-29T23:15:38.435Z', '00000000-0000-4000-a000-000000000031', '00000000-0000-4000-a000-000000000059'),
  (647, '2025-08-28T23:15:38.435Z', '00000000-0000-4000-a000-000000000031', '00000000-0000-4000-a000-000000000002'),
  (648, '2025-08-27T23:15:38.435Z', '00000000-0000-4000-a000-000000000031', '00000000-0000-4000-a000-00000000000f'),
  (649, '2025-08-26T23:15:38.435Z', '00000000-0000-4000-a000-000000000031', '00000000-0000-4000-a000-00000000001c'),
  (650, '2025-08-25T23:15:38.435Z', '00000000-0000-4000-a000-000000000031', '00000000-0000-4000-a000-000000000029');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (651, '2025-08-24T23:15:38.435Z', '00000000-0000-4000-a000-000000000031', '00000000-0000-4000-a000-000000000036'),
  (652, '2025-08-23T23:15:38.435Z', '00000000-0000-4000-a000-000000000031', '00000000-0000-4000-a000-000000000043'),
  (653, '2025-08-22T23:15:38.435Z', '00000000-0000-4000-a000-000000000031', '00000000-0000-4000-a000-000000000050'),
  (654, '2025-08-21T23:15:38.435Z', '00000000-0000-4000-a000-000000000031', '00000000-0000-4000-a000-00000000005d'),
  (655, '2025-08-20T23:15:38.435Z', '00000000-0000-4000-a000-000000000032', '00000000-0000-4000-a000-00000000002c'),
  (656, '2025-08-19T23:15:38.435Z', '00000000-0000-4000-a000-000000000032', '00000000-0000-4000-a000-000000000039'),
  (657, '2025-08-18T23:15:38.435Z', '00000000-0000-4000-a000-000000000032', '00000000-0000-4000-a000-000000000046'),
  (658, '2025-08-17T23:15:38.435Z', '00000000-0000-4000-a000-000000000032', '00000000-0000-4000-a000-000000000053'),
  (659, '2025-08-16T23:15:38.435Z', '00000000-0000-4000-a000-000000000032', '00000000-0000-4000-a000-000000000060'),
  (660, '2025-08-15T23:15:38.435Z', '00000000-0000-4000-a000-000000000032', '00000000-0000-4000-a000-000000000009'),
  (661, '2025-08-14T23:15:38.435Z', '00000000-0000-4000-a000-000000000032', '00000000-0000-4000-a000-000000000016'),
  (662, '2025-08-13T23:15:38.435Z', '00000000-0000-4000-a000-000000000032', '00000000-0000-4000-a000-000000000023'),
  (663, '2025-08-12T23:15:38.435Z', '00000000-0000-4000-a000-000000000032', '00000000-0000-4000-a000-000000000030'),
  (664, '2025-08-11T23:15:38.435Z', '00000000-0000-4000-a000-000000000032', '00000000-0000-4000-a000-00000000003d'),
  (665, '2025-08-10T23:15:38.435Z', '00000000-0000-4000-a000-000000000032', '00000000-0000-4000-a000-00000000004a'),
  (666, '2025-08-09T23:15:38.435Z', '00000000-0000-4000-a000-000000000032', '00000000-0000-4000-a000-000000000057'),
  (667, '2025-08-08T23:15:38.435Z', '00000000-0000-4000-a000-000000000032', '00000000-0000-4000-a000-000000000064'),
  (668, '2025-08-07T23:15:38.435Z', '00000000-0000-4000-a000-000000000032', '00000000-0000-4000-a000-00000000000d'),
  (669, '2025-08-06T23:15:38.435Z', '00000000-0000-4000-a000-000000000033', '00000000-0000-4000-a000-000000000040'),
  (670, '2025-08-05T23:15:38.435Z', '00000000-0000-4000-a000-000000000033', '00000000-0000-4000-a000-00000000004d'),
  (671, '2025-08-04T23:15:38.435Z', '00000000-0000-4000-a000-000000000033', '00000000-0000-4000-a000-00000000005a'),
  (672, '2025-08-03T23:15:38.435Z', '00000000-0000-4000-a000-000000000033', '00000000-0000-4000-a000-000000000003'),
  (673, '2025-08-02T23:15:38.435Z', '00000000-0000-4000-a000-000000000033', '00000000-0000-4000-a000-000000000010'),
  (674, '2025-08-01T23:15:38.435Z', '00000000-0000-4000-a000-000000000033', '00000000-0000-4000-a000-00000000001d'),
  (675, '2025-07-31T23:15:38.435Z', '00000000-0000-4000-a000-000000000033', '00000000-0000-4000-a000-00000000002a'),
  (676, '2025-07-30T23:15:38.435Z', '00000000-0000-4000-a000-000000000033', '00000000-0000-4000-a000-000000000037'),
  (677, '2025-07-29T23:15:38.435Z', '00000000-0000-4000-a000-000000000033', '00000000-0000-4000-a000-000000000044'),
  (678, '2025-07-28T23:15:38.435Z', '00000000-0000-4000-a000-000000000033', '00000000-0000-4000-a000-000000000051'),
  (679, '2025-07-27T23:15:38.435Z', '00000000-0000-4000-a000-000000000033', '00000000-0000-4000-a000-00000000005e'),
  (680, '2025-07-26T23:15:38.435Z', '00000000-0000-4000-a000-000000000033', '00000000-0000-4000-a000-000000000007'),
  (681, '2025-07-25T23:15:38.435Z', '00000000-0000-4000-a000-000000000033', '00000000-0000-4000-a000-000000000014'),
  (682, '2025-07-24T23:15:38.435Z', '00000000-0000-4000-a000-000000000033', '00000000-0000-4000-a000-000000000021'),
  (683, '2025-07-23T23:15:38.435Z', '00000000-0000-4000-a000-000000000034', '00000000-0000-4000-a000-00000000003a'),
  (684, '2025-07-22T23:15:38.435Z', '00000000-0000-4000-a000-000000000034', '00000000-0000-4000-a000-000000000047'),
  (685, '2025-07-21T23:15:38.435Z', '00000000-0000-4000-a000-000000000034', '00000000-0000-4000-a000-000000000054'),
  (686, '2025-07-20T23:15:38.435Z', '00000000-0000-4000-a000-000000000034', '00000000-0000-4000-a000-000000000061'),
  (687, '2025-07-19T23:15:38.435Z', '00000000-0000-4000-a000-000000000034', '00000000-0000-4000-a000-00000000000a'),
  (688, '2025-07-18T23:15:38.435Z', '00000000-0000-4000-a000-000000000034', '00000000-0000-4000-a000-000000000017'),
  (689, '2025-07-17T23:15:38.435Z', '00000000-0000-4000-a000-000000000034', '00000000-0000-4000-a000-000000000024'),
  (690, '2025-07-16T23:15:38.435Z', '00000000-0000-4000-a000-000000000034', '00000000-0000-4000-a000-000000000031'),
  (691, '2025-07-15T23:15:38.435Z', '00000000-0000-4000-a000-000000000034', '00000000-0000-4000-a000-00000000003e'),
  (692, '2025-07-14T23:15:38.435Z', '00000000-0000-4000-a000-000000000034', '00000000-0000-4000-a000-00000000004b'),
  (693, '2025-07-13T23:15:38.435Z', '00000000-0000-4000-a000-000000000034', '00000000-0000-4000-a000-000000000058'),
  (694, '2025-07-12T23:15:38.435Z', '00000000-0000-4000-a000-000000000034', '00000000-0000-4000-a000-000000000001'),
  (695, '2025-07-11T23:15:38.435Z', '00000000-0000-4000-a000-000000000034', '00000000-0000-4000-a000-00000000000e'),
  (696, '2025-07-10T23:15:38.435Z', '00000000-0000-4000-a000-000000000034', '00000000-0000-4000-a000-00000000001b'),
  (697, '2025-07-09T23:15:38.435Z', '00000000-0000-4000-a000-000000000034', '00000000-0000-4000-a000-000000000028'),
  (698, '2025-07-08T23:15:38.435Z', '00000000-0000-4000-a000-000000000034', '00000000-0000-4000-a000-000000000035'),
  (699, '2025-07-07T23:15:38.435Z', '00000000-0000-4000-a000-000000000035', '00000000-0000-4000-a000-000000000041'),
  (700, '2025-07-06T23:15:38.435Z', '00000000-0000-4000-a000-000000000035', '00000000-0000-4000-a000-00000000004e');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (701, '2025-07-05T23:15:38.435Z', '00000000-0000-4000-a000-000000000035', '00000000-0000-4000-a000-00000000005b'),
  (702, '2025-07-04T23:15:38.435Z', '00000000-0000-4000-a000-000000000035', '00000000-0000-4000-a000-000000000004'),
  (703, '2025-07-03T23:15:38.435Z', '00000000-0000-4000-a000-000000000035', '00000000-0000-4000-a000-000000000011'),
  (704, '2025-07-02T23:15:38.435Z', '00000000-0000-4000-a000-000000000035', '00000000-0000-4000-a000-00000000001e'),
  (705, '2025-07-01T23:15:38.435Z', '00000000-0000-4000-a000-000000000035', '00000000-0000-4000-a000-00000000002b'),
  (706, '2025-06-30T23:15:38.435Z', '00000000-0000-4000-a000-000000000035', '00000000-0000-4000-a000-000000000038'),
  (707, '2025-06-29T23:15:38.435Z', '00000000-0000-4000-a000-000000000035', '00000000-0000-4000-a000-000000000045'),
  (708, '2025-06-28T23:15:38.435Z', '00000000-0000-4000-a000-000000000035', '00000000-0000-4000-a000-000000000052'),
  (709, '2025-06-27T23:15:38.435Z', '00000000-0000-4000-a000-000000000035', '00000000-0000-4000-a000-00000000005f'),
  (710, '2025-06-26T23:15:38.435Z', '00000000-0000-4000-a000-000000000035', '00000000-0000-4000-a000-000000000008'),
  (711, '2025-06-25T23:15:38.435Z', '00000000-0000-4000-a000-000000000035', '00000000-0000-4000-a000-000000000015'),
  (712, '2025-06-24T23:15:38.435Z', '00000000-0000-4000-a000-000000000035', '00000000-0000-4000-a000-000000000022'),
  (713, '2025-06-23T23:15:38.435Z', '00000000-0000-4000-a000-000000000035', '00000000-0000-4000-a000-00000000002f'),
  (714, '2025-06-22T23:15:38.435Z', '00000000-0000-4000-a000-000000000035', '00000000-0000-4000-a000-00000000003c'),
  (715, '2025-06-21T23:15:38.435Z', '00000000-0000-4000-a000-000000000035', '00000000-0000-4000-a000-000000000049'),
  (716, '2025-06-20T23:15:38.435Z', '00000000-0000-4000-a000-000000000036', '00000000-0000-4000-a000-000000000048'),
  (717, '2025-06-19T23:15:38.435Z', '00000000-0000-4000-a000-000000000036', '00000000-0000-4000-a000-000000000055'),
  (718, '2025-06-18T23:15:38.435Z', '00000000-0000-4000-a000-000000000036', '00000000-0000-4000-a000-000000000062'),
  (719, '2025-06-17T23:15:38.435Z', '00000000-0000-4000-a000-000000000036', '00000000-0000-4000-a000-00000000000b'),
  (720, '2025-06-16T23:15:38.435Z', '00000000-0000-4000-a000-000000000036', '00000000-0000-4000-a000-000000000018'),
  (721, '2025-06-15T23:15:38.435Z', '00000000-0000-4000-a000-000000000036', '00000000-0000-4000-a000-000000000025'),
  (722, '2025-06-14T23:15:38.435Z', '00000000-0000-4000-a000-000000000036', '00000000-0000-4000-a000-000000000032'),
  (723, '2025-06-13T23:15:38.435Z', '00000000-0000-4000-a000-000000000036', '00000000-0000-4000-a000-00000000003f'),
  (724, '2025-06-12T23:15:38.435Z', '00000000-0000-4000-a000-000000000036', '00000000-0000-4000-a000-00000000004c'),
  (725, '2025-06-11T23:15:38.435Z', '00000000-0000-4000-a000-000000000036', '00000000-0000-4000-a000-000000000059'),
  (726, '2025-06-10T23:15:38.435Z', '00000000-0000-4000-a000-000000000036', '00000000-0000-4000-a000-000000000002'),
  (727, '2025-06-09T23:15:38.435Z', '00000000-0000-4000-a000-000000000036', '00000000-0000-4000-a000-00000000000f'),
  (728, '2025-06-08T23:15:38.435Z', '00000000-0000-4000-a000-000000000036', '00000000-0000-4000-a000-00000000001c'),
  (729, '2025-06-07T23:15:38.435Z', '00000000-0000-4000-a000-000000000036', '00000000-0000-4000-a000-000000000029'),
  (730, '2026-06-06T23:15:38.435Z', '00000000-0000-4000-a000-000000000036', '00000000-0000-4000-a000-000000000043'),
  (731, '2026-06-05T23:15:38.435Z', '00000000-0000-4000-a000-000000000036', '00000000-0000-4000-a000-000000000050'),
  (732, '2026-06-04T23:15:38.435Z', '00000000-0000-4000-a000-000000000036', '00000000-0000-4000-a000-00000000005d'),
  (733, '2026-06-03T23:15:38.435Z', '00000000-0000-4000-a000-000000000037', '00000000-0000-4000-a000-00000000004f'),
  (734, '2026-06-02T23:15:38.435Z', '00000000-0000-4000-a000-000000000037', '00000000-0000-4000-a000-00000000005c'),
  (735, '2026-06-01T23:15:38.435Z', '00000000-0000-4000-a000-000000000037', '00000000-0000-4000-a000-000000000005'),
  (736, '2026-05-31T23:15:38.435Z', '00000000-0000-4000-a000-000000000037', '00000000-0000-4000-a000-000000000012'),
  (737, '2026-05-30T23:15:38.435Z', '00000000-0000-4000-a000-000000000037', '00000000-0000-4000-a000-00000000001f'),
  (738, '2026-05-29T23:15:38.435Z', '00000000-0000-4000-a000-000000000037', '00000000-0000-4000-a000-00000000002c'),
  (739, '2026-05-28T23:15:38.435Z', '00000000-0000-4000-a000-000000000037', '00000000-0000-4000-a000-000000000039'),
  (740, '2026-05-27T23:15:38.435Z', '00000000-0000-4000-a000-000000000037', '00000000-0000-4000-a000-000000000046'),
  (741, '2026-05-26T23:15:38.435Z', '00000000-0000-4000-a000-000000000037', '00000000-0000-4000-a000-000000000053'),
  (742, '2026-05-25T23:15:38.435Z', '00000000-0000-4000-a000-000000000037', '00000000-0000-4000-a000-000000000060'),
  (743, '2026-05-24T23:15:38.435Z', '00000000-0000-4000-a000-000000000037', '00000000-0000-4000-a000-000000000009'),
  (744, '2026-05-23T23:15:38.435Z', '00000000-0000-4000-a000-000000000037', '00000000-0000-4000-a000-000000000016'),
  (745, '2026-05-22T23:15:38.435Z', '00000000-0000-4000-a000-000000000037', '00000000-0000-4000-a000-000000000023'),
  (746, '2026-05-21T23:15:38.435Z', '00000000-0000-4000-a000-000000000037', '00000000-0000-4000-a000-000000000030'),
  (747, '2026-05-20T23:15:38.435Z', '00000000-0000-4000-a000-000000000037', '00000000-0000-4000-a000-00000000003d'),
  (748, '2026-05-19T23:15:38.435Z', '00000000-0000-4000-a000-000000000037', '00000000-0000-4000-a000-00000000004a'),
  (749, '2026-05-18T23:15:38.435Z', '00000000-0000-4000-a000-000000000037', '00000000-0000-4000-a000-000000000057'),
  (750, '2026-05-17T23:15:38.435Z', '00000000-0000-4000-a000-000000000037', '00000000-0000-4000-a000-000000000064');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (751, '2026-05-16T23:15:38.435Z', '00000000-0000-4000-a000-000000000037', '00000000-0000-4000-a000-00000000000d'),
  (752, '2026-05-15T23:15:38.435Z', '00000000-0000-4000-a000-000000000038', '00000000-0000-4000-a000-000000000056'),
  (753, '2026-05-14T23:15:38.435Z', '00000000-0000-4000-a000-000000000038', '00000000-0000-4000-a000-000000000063'),
  (754, '2026-05-13T23:15:38.435Z', '00000000-0000-4000-a000-000000000038', '00000000-0000-4000-a000-00000000000c'),
  (755, '2026-05-12T23:15:38.435Z', '00000000-0000-4000-a000-000000000038', '00000000-0000-4000-a000-000000000019'),
  (756, '2026-05-11T23:15:38.435Z', '00000000-0000-4000-a000-000000000038', '00000000-0000-4000-a000-000000000026'),
  (757, '2026-05-10T23:15:38.435Z', '00000000-0000-4000-a000-000000000038', '00000000-0000-4000-a000-000000000033'),
  (758, '2026-05-09T23:15:38.435Z', '00000000-0000-4000-a000-000000000038', '00000000-0000-4000-a000-000000000040'),
  (759, '2026-05-08T23:15:38.435Z', '00000000-0000-4000-a000-000000000038', '00000000-0000-4000-a000-00000000004d'),
  (760, '2026-05-07T23:15:38.435Z', '00000000-0000-4000-a000-000000000038', '00000000-0000-4000-a000-00000000005a'),
  (761, '2026-05-06T23:15:38.435Z', '00000000-0000-4000-a000-000000000038', '00000000-0000-4000-a000-000000000003'),
  (762, '2026-05-05T23:15:38.435Z', '00000000-0000-4000-a000-000000000038', '00000000-0000-4000-a000-000000000010'),
  (763, '2026-05-04T23:15:38.435Z', '00000000-0000-4000-a000-000000000038', '00000000-0000-4000-a000-00000000001d'),
  (764, '2026-05-03T23:15:38.435Z', '00000000-0000-4000-a000-000000000038', '00000000-0000-4000-a000-00000000002a'),
  (765, '2026-05-02T23:15:38.435Z', '00000000-0000-4000-a000-000000000038', '00000000-0000-4000-a000-000000000037'),
  (766, '2026-05-01T23:15:38.435Z', '00000000-0000-4000-a000-000000000038', '00000000-0000-4000-a000-000000000044'),
  (767, '2026-04-30T23:15:38.435Z', '00000000-0000-4000-a000-000000000038', '00000000-0000-4000-a000-000000000051'),
  (768, '2026-04-29T23:15:38.435Z', '00000000-0000-4000-a000-000000000038', '00000000-0000-4000-a000-00000000005e'),
  (769, '2026-04-28T23:15:38.435Z', '00000000-0000-4000-a000-000000000038', '00000000-0000-4000-a000-000000000007'),
  (770, '2026-04-27T23:15:38.435Z', '00000000-0000-4000-a000-000000000038', '00000000-0000-4000-a000-000000000014'),
  (771, '2026-04-26T23:15:38.435Z', '00000000-0000-4000-a000-000000000038', '00000000-0000-4000-a000-000000000021'),
  (772, '2026-04-25T23:15:38.435Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-00000000005d'),
  (773, '2026-04-24T23:15:38.435Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-000000000006'),
  (774, '2026-04-23T23:15:38.435Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-000000000013'),
  (775, '2026-04-22T23:15:38.435Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-000000000020'),
  (776, '2026-04-21T23:15:38.435Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-00000000002d'),
  (777, '2026-04-20T23:15:38.435Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-00000000003a'),
  (778, '2026-04-19T23:15:38.435Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-000000000047'),
  (779, '2026-04-18T23:15:38.435Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-000000000054'),
  (780, '2026-04-17T23:15:38.435Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-000000000061'),
  (781, '2026-04-16T23:15:38.435Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-00000000000a'),
  (782, '2026-04-15T23:15:38.435Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-000000000017'),
  (783, '2026-04-14T23:15:38.435Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-000000000024'),
  (784, '2026-04-13T23:15:38.435Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-000000000031'),
  (785, '2026-04-12T23:15:38.435Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-00000000003e'),
  (786, '2026-04-11T23:15:38.435Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-00000000004b'),
  (787, '2026-04-10T23:15:38.435Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-000000000058'),
  (788, '2026-04-09T23:15:38.435Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-000000000001'),
  (789, '2026-04-08T23:15:38.435Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-00000000000e'),
  (790, '2026-04-07T23:15:38.435Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-00000000001b'),
  (791, '2026-04-06T23:15:38.436Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-000000000028'),
  (792, '2026-04-05T23:15:38.436Z', '00000000-0000-4000-a000-000000000039', '00000000-0000-4000-a000-000000000035'),
  (793, '2026-04-04T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-000000000064'),
  (794, '2026-04-03T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-00000000000d'),
  (795, '2026-04-02T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-00000000001a'),
  (796, '2026-04-01T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-000000000027'),
  (797, '2026-03-31T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-000000000034'),
  (798, '2026-03-30T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-000000000041'),
  (799, '2026-03-29T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-00000000004e'),
  (800, '2026-03-28T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-00000000005b');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (801, '2026-03-27T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-000000000004'),
  (802, '2026-03-26T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-000000000011'),
  (803, '2026-03-25T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-00000000001e'),
  (804, '2026-03-24T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-00000000002b'),
  (805, '2026-03-23T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-000000000038'),
  (806, '2026-03-22T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-000000000045'),
  (807, '2026-03-21T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-000000000052'),
  (808, '2026-03-20T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-00000000005f'),
  (809, '2026-03-19T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-000000000008'),
  (810, '2026-03-18T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-000000000015'),
  (811, '2026-03-17T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-000000000022'),
  (812, '2026-03-16T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-00000000002f'),
  (813, '2026-03-15T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-00000000003c'),
  (814, '2026-03-14T23:15:38.436Z', '00000000-0000-4000-a000-00000000003a', '00000000-0000-4000-a000-000000000049'),
  (815, '2026-03-13T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-000000000007'),
  (816, '2026-03-12T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-000000000014'),
  (817, '2026-03-11T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-000000000021'),
  (818, '2026-03-10T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-00000000002e'),
  (819, '2026-03-09T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-000000000048'),
  (820, '2026-03-08T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-000000000055'),
  (821, '2026-03-07T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-000000000062'),
  (822, '2026-03-06T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-00000000000b'),
  (823, '2026-03-05T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-000000000018'),
  (824, '2026-03-04T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-000000000025'),
  (825, '2026-03-03T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-000000000032'),
  (826, '2026-03-02T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-00000000003f'),
  (827, '2026-03-01T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-00000000004c'),
  (828, '2026-02-28T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-000000000059'),
  (829, '2026-02-27T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-000000000002'),
  (830, '2026-02-26T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-00000000000f'),
  (831, '2026-02-25T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-00000000001c'),
  (832, '2026-02-24T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-000000000029'),
  (833, '2026-02-23T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-000000000036'),
  (834, '2026-02-22T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-000000000043'),
  (835, '2026-02-21T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-000000000050'),
  (836, '2026-02-20T23:15:38.436Z', '00000000-0000-4000-a000-00000000003b', '00000000-0000-4000-a000-00000000005d'),
  (837, '2026-02-19T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-00000000000e'),
  (838, '2026-02-18T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-00000000001b'),
  (839, '2026-02-17T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-000000000028'),
  (840, '2026-02-16T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-000000000035'),
  (841, '2026-02-15T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-000000000042'),
  (842, '2026-02-14T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-00000000004f'),
  (843, '2026-02-13T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-00000000005c'),
  (844, '2026-02-12T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-000000000005'),
  (845, '2026-02-11T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-000000000012'),
  (846, '2026-02-10T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-00000000001f'),
  (847, '2026-02-09T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-00000000002c'),
  (848, '2026-02-08T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-000000000039'),
  (849, '2026-02-07T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-000000000046'),
  (850, '2026-02-06T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-000000000053');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (851, '2026-02-05T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-000000000060'),
  (852, '2026-02-04T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-000000000009'),
  (853, '2026-02-03T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-000000000016'),
  (854, '2026-02-02T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-000000000023'),
  (855, '2026-02-01T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-000000000030'),
  (856, '2026-01-31T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-00000000003d'),
  (857, '2026-01-30T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-00000000004a'),
  (858, '2026-01-29T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-000000000057'),
  (859, '2026-01-28T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-000000000064'),
  (860, '2026-01-27T23:15:38.436Z', '00000000-0000-4000-a000-00000000003c', '00000000-0000-4000-a000-00000000000d'),
  (861, '2026-01-26T23:15:38.436Z', '00000000-0000-4000-a000-00000000003d', '00000000-0000-4000-a000-000000000015'),
  (862, '2026-01-25T23:15:38.436Z', '00000000-0000-4000-a000-00000000003d', '00000000-0000-4000-a000-000000000022'),
  (863, '2026-01-24T23:15:38.436Z', '00000000-0000-4000-a000-00000000003d', '00000000-0000-4000-a000-00000000002f'),
  (864, '2026-01-23T23:15:38.436Z', '00000000-0000-4000-a000-00000000003d', '00000000-0000-4000-a000-00000000003c'),
  (865, '2026-01-22T23:15:38.436Z', '00000000-0000-4000-a000-00000000003d', '00000000-0000-4000-a000-000000000049'),
  (866, '2026-01-21T23:15:38.436Z', '00000000-0000-4000-a000-00000000003e', '00000000-0000-4000-a000-00000000001c'),
  (867, '2026-01-20T23:15:38.436Z', '00000000-0000-4000-a000-00000000003e', '00000000-0000-4000-a000-000000000029'),
  (868, '2026-01-19T23:15:38.436Z', '00000000-0000-4000-a000-00000000003e', '00000000-0000-4000-a000-000000000036'),
  (869, '2026-01-18T23:15:38.436Z', '00000000-0000-4000-a000-00000000003e', '00000000-0000-4000-a000-000000000043'),
  (870, '2026-01-17T23:15:38.436Z', '00000000-0000-4000-a000-00000000003e', '00000000-0000-4000-a000-000000000050'),
  (871, '2026-01-16T23:15:38.436Z', '00000000-0000-4000-a000-00000000003e', '00000000-0000-4000-a000-00000000005d'),
  (872, '2026-01-15T23:15:38.436Z', '00000000-0000-4000-a000-00000000003f', '00000000-0000-4000-a000-000000000023'),
  (873, '2026-01-14T23:15:38.436Z', '00000000-0000-4000-a000-00000000003f', '00000000-0000-4000-a000-000000000030'),
  (874, '2026-01-13T23:15:38.436Z', '00000000-0000-4000-a000-00000000003f', '00000000-0000-4000-a000-00000000003d'),
  (875, '2026-01-12T23:15:38.436Z', '00000000-0000-4000-a000-00000000003f', '00000000-0000-4000-a000-00000000004a'),
  (876, '2026-01-11T23:15:38.436Z', '00000000-0000-4000-a000-00000000003f', '00000000-0000-4000-a000-000000000057'),
  (877, '2026-01-10T23:15:38.438Z', '00000000-0000-4000-a000-00000000003f', '00000000-0000-4000-a000-000000000064'),
  (878, '2026-01-09T23:15:38.438Z', '00000000-0000-4000-a000-00000000003f', '00000000-0000-4000-a000-00000000000d'),
  (879, '2026-01-08T23:15:38.438Z', '00000000-0000-4000-a000-000000000040', '00000000-0000-4000-a000-00000000002a'),
  (880, '2026-01-07T23:15:38.438Z', '00000000-0000-4000-a000-000000000040', '00000000-0000-4000-a000-000000000037'),
  (881, '2026-01-06T23:15:38.438Z', '00000000-0000-4000-a000-000000000040', '00000000-0000-4000-a000-000000000044'),
  (882, '2026-01-05T23:15:38.438Z', '00000000-0000-4000-a000-000000000040', '00000000-0000-4000-a000-000000000051'),
  (883, '2026-01-04T23:15:38.438Z', '00000000-0000-4000-a000-000000000040', '00000000-0000-4000-a000-00000000005e'),
  (884, '2026-01-03T23:15:38.438Z', '00000000-0000-4000-a000-000000000040', '00000000-0000-4000-a000-000000000007'),
  (885, '2026-01-02T23:15:38.438Z', '00000000-0000-4000-a000-000000000040', '00000000-0000-4000-a000-000000000014'),
  (886, '2026-01-01T23:15:38.438Z', '00000000-0000-4000-a000-000000000040', '00000000-0000-4000-a000-000000000021'),
  (887, '2025-12-31T23:15:38.438Z', '00000000-0000-4000-a000-000000000041', '00000000-0000-4000-a000-000000000031'),
  (888, '2025-12-30T23:15:38.438Z', '00000000-0000-4000-a000-000000000041', '00000000-0000-4000-a000-00000000003e'),
  (889, '2025-12-29T23:15:38.438Z', '00000000-0000-4000-a000-000000000041', '00000000-0000-4000-a000-00000000004b'),
  (890, '2025-12-28T23:15:38.438Z', '00000000-0000-4000-a000-000000000041', '00000000-0000-4000-a000-000000000058'),
  (891, '2025-12-27T23:15:38.438Z', '00000000-0000-4000-a000-000000000041', '00000000-0000-4000-a000-000000000001'),
  (892, '2025-12-26T23:15:38.438Z', '00000000-0000-4000-a000-000000000041', '00000000-0000-4000-a000-00000000000e'),
  (893, '2025-12-25T23:15:38.438Z', '00000000-0000-4000-a000-000000000041', '00000000-0000-4000-a000-00000000001b'),
  (894, '2025-12-24T23:15:38.438Z', '00000000-0000-4000-a000-000000000041', '00000000-0000-4000-a000-000000000028'),
  (895, '2025-12-23T23:15:38.438Z', '00000000-0000-4000-a000-000000000041', '00000000-0000-4000-a000-000000000035'),
  (896, '2025-12-22T23:15:38.438Z', '00000000-0000-4000-a000-000000000042', '00000000-0000-4000-a000-000000000038'),
  (897, '2025-12-21T23:15:38.438Z', '00000000-0000-4000-a000-000000000042', '00000000-0000-4000-a000-000000000045'),
  (898, '2025-12-20T23:15:38.438Z', '00000000-0000-4000-a000-000000000042', '00000000-0000-4000-a000-000000000052'),
  (899, '2025-12-19T23:15:38.438Z', '00000000-0000-4000-a000-000000000042', '00000000-0000-4000-a000-00000000005f'),
  (900, '2025-12-18T23:15:38.438Z', '00000000-0000-4000-a000-000000000042', '00000000-0000-4000-a000-000000000008');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (901, '2025-12-17T23:15:38.438Z', '00000000-0000-4000-a000-000000000042', '00000000-0000-4000-a000-000000000015'),
  (902, '2025-12-16T23:15:38.438Z', '00000000-0000-4000-a000-000000000042', '00000000-0000-4000-a000-000000000022'),
  (903, '2025-12-15T23:15:38.438Z', '00000000-0000-4000-a000-000000000042', '00000000-0000-4000-a000-00000000002f'),
  (904, '2025-12-14T23:15:38.438Z', '00000000-0000-4000-a000-000000000042', '00000000-0000-4000-a000-00000000003c'),
  (905, '2025-12-13T23:15:38.438Z', '00000000-0000-4000-a000-000000000042', '00000000-0000-4000-a000-000000000049'),
  (906, '2025-12-12T23:15:38.438Z', '00000000-0000-4000-a000-000000000043', '00000000-0000-4000-a000-00000000003f'),
  (907, '2025-12-11T23:15:38.438Z', '00000000-0000-4000-a000-000000000043', '00000000-0000-4000-a000-00000000004c'),
  (908, '2025-12-10T23:15:38.439Z', '00000000-0000-4000-a000-000000000043', '00000000-0000-4000-a000-000000000059'),
  (909, '2025-12-09T23:15:38.439Z', '00000000-0000-4000-a000-000000000043', '00000000-0000-4000-a000-000000000002'),
  (910, '2025-12-08T23:15:38.439Z', '00000000-0000-4000-a000-000000000043', '00000000-0000-4000-a000-00000000000f'),
  (911, '2025-12-07T23:15:38.439Z', '00000000-0000-4000-a000-000000000043', '00000000-0000-4000-a000-00000000001c'),
  (912, '2025-12-06T23:15:38.439Z', '00000000-0000-4000-a000-000000000043', '00000000-0000-4000-a000-000000000029'),
  (913, '2025-12-05T23:15:38.439Z', '00000000-0000-4000-a000-000000000043', '00000000-0000-4000-a000-000000000036'),
  (914, '2025-12-04T23:15:38.439Z', '00000000-0000-4000-a000-000000000043', '00000000-0000-4000-a000-000000000050'),
  (915, '2025-12-03T23:15:38.439Z', '00000000-0000-4000-a000-000000000043', '00000000-0000-4000-a000-00000000005d'),
  (916, '2025-12-02T23:15:38.439Z', '00000000-0000-4000-a000-000000000044', '00000000-0000-4000-a000-000000000046'),
  (917, '2025-12-01T23:15:38.439Z', '00000000-0000-4000-a000-000000000044', '00000000-0000-4000-a000-000000000053'),
  (918, '2025-11-30T23:15:38.439Z', '00000000-0000-4000-a000-000000000044', '00000000-0000-4000-a000-000000000060'),
  (919, '2025-11-29T23:15:38.439Z', '00000000-0000-4000-a000-000000000044', '00000000-0000-4000-a000-000000000009'),
  (920, '2025-11-28T23:15:38.439Z', '00000000-0000-4000-a000-000000000044', '00000000-0000-4000-a000-000000000016'),
  (921, '2025-11-27T23:15:38.439Z', '00000000-0000-4000-a000-000000000044', '00000000-0000-4000-a000-000000000023'),
  (922, '2025-11-26T23:15:38.439Z', '00000000-0000-4000-a000-000000000044', '00000000-0000-4000-a000-000000000030'),
  (923, '2025-11-25T23:15:38.439Z', '00000000-0000-4000-a000-000000000044', '00000000-0000-4000-a000-00000000003d'),
  (924, '2025-11-24T23:15:38.439Z', '00000000-0000-4000-a000-000000000044', '00000000-0000-4000-a000-00000000004a'),
  (925, '2025-11-23T23:15:38.439Z', '00000000-0000-4000-a000-000000000044', '00000000-0000-4000-a000-000000000057'),
  (926, '2025-11-22T23:15:38.439Z', '00000000-0000-4000-a000-000000000044', '00000000-0000-4000-a000-000000000064'),
  (927, '2025-11-21T23:15:38.439Z', '00000000-0000-4000-a000-000000000044', '00000000-0000-4000-a000-00000000000d'),
  (928, '2025-11-20T23:15:38.439Z', '00000000-0000-4000-a000-000000000045', '00000000-0000-4000-a000-00000000004d'),
  (929, '2025-11-19T23:15:38.439Z', '00000000-0000-4000-a000-000000000045', '00000000-0000-4000-a000-00000000005a'),
  (930, '2025-11-18T23:15:38.439Z', '00000000-0000-4000-a000-000000000045', '00000000-0000-4000-a000-000000000003'),
  (931, '2025-11-17T23:15:38.439Z', '00000000-0000-4000-a000-000000000045', '00000000-0000-4000-a000-000000000010'),
  (932, '2025-11-16T23:15:38.439Z', '00000000-0000-4000-a000-000000000045', '00000000-0000-4000-a000-00000000001d'),
  (933, '2025-11-15T23:15:38.439Z', '00000000-0000-4000-a000-000000000045', '00000000-0000-4000-a000-00000000002a'),
  (934, '2025-11-14T23:15:38.439Z', '00000000-0000-4000-a000-000000000045', '00000000-0000-4000-a000-000000000037'),
  (935, '2025-11-13T23:15:38.439Z', '00000000-0000-4000-a000-000000000045', '00000000-0000-4000-a000-000000000044'),
  (936, '2025-11-12T23:15:38.439Z', '00000000-0000-4000-a000-000000000045', '00000000-0000-4000-a000-000000000051'),
  (937, '2025-11-11T23:15:38.439Z', '00000000-0000-4000-a000-000000000045', '00000000-0000-4000-a000-00000000005e'),
  (938, '2025-11-10T23:15:38.439Z', '00000000-0000-4000-a000-000000000045', '00000000-0000-4000-a000-000000000007'),
  (939, '2025-11-09T23:15:38.439Z', '00000000-0000-4000-a000-000000000045', '00000000-0000-4000-a000-000000000014'),
  (940, '2025-11-08T23:15:38.439Z', '00000000-0000-4000-a000-000000000045', '00000000-0000-4000-a000-000000000021'),
  (941, '2025-11-07T23:15:38.439Z', '00000000-0000-4000-a000-000000000046', '00000000-0000-4000-a000-000000000054'),
  (942, '2025-11-06T23:15:38.439Z', '00000000-0000-4000-a000-000000000046', '00000000-0000-4000-a000-000000000061'),
  (943, '2025-11-05T23:15:38.439Z', '00000000-0000-4000-a000-000000000046', '00000000-0000-4000-a000-00000000000a'),
  (944, '2025-11-04T23:15:38.439Z', '00000000-0000-4000-a000-000000000046', '00000000-0000-4000-a000-000000000017'),
  (945, '2025-11-03T23:15:38.439Z', '00000000-0000-4000-a000-000000000046', '00000000-0000-4000-a000-000000000024'),
  (946, '2025-11-02T23:15:38.439Z', '00000000-0000-4000-a000-000000000046', '00000000-0000-4000-a000-000000000031'),
  (947, '2025-11-01T23:15:38.439Z', '00000000-0000-4000-a000-000000000046', '00000000-0000-4000-a000-00000000003e'),
  (948, '2025-10-31T23:15:38.439Z', '00000000-0000-4000-a000-000000000046', '00000000-0000-4000-a000-00000000004b'),
  (949, '2025-10-30T23:15:38.439Z', '00000000-0000-4000-a000-000000000046', '00000000-0000-4000-a000-000000000058'),
  (950, '2025-10-29T23:15:38.439Z', '00000000-0000-4000-a000-000000000046', '00000000-0000-4000-a000-000000000001');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (951, '2025-10-28T23:15:38.439Z', '00000000-0000-4000-a000-000000000046', '00000000-0000-4000-a000-00000000000e'),
  (952, '2025-10-27T23:15:38.439Z', '00000000-0000-4000-a000-000000000046', '00000000-0000-4000-a000-00000000001b'),
  (953, '2025-10-26T23:15:38.439Z', '00000000-0000-4000-a000-000000000046', '00000000-0000-4000-a000-000000000028'),
  (954, '2025-10-25T23:15:38.439Z', '00000000-0000-4000-a000-000000000046', '00000000-0000-4000-a000-000000000035'),
  (955, '2025-10-24T23:15:38.439Z', '00000000-0000-4000-a000-000000000047', '00000000-0000-4000-a000-00000000005b'),
  (956, '2025-10-23T23:15:38.439Z', '00000000-0000-4000-a000-000000000047', '00000000-0000-4000-a000-000000000004'),
  (957, '2025-10-22T23:15:38.439Z', '00000000-0000-4000-a000-000000000047', '00000000-0000-4000-a000-000000000011'),
  (958, '2025-10-21T23:15:38.439Z', '00000000-0000-4000-a000-000000000047', '00000000-0000-4000-a000-00000000001e'),
  (959, '2025-10-20T23:15:38.439Z', '00000000-0000-4000-a000-000000000047', '00000000-0000-4000-a000-00000000002b'),
  (960, '2025-10-19T23:15:38.439Z', '00000000-0000-4000-a000-000000000047', '00000000-0000-4000-a000-000000000038'),
  (961, '2025-10-18T23:15:38.439Z', '00000000-0000-4000-a000-000000000047', '00000000-0000-4000-a000-000000000045'),
  (962, '2025-10-17T23:15:38.439Z', '00000000-0000-4000-a000-000000000047', '00000000-0000-4000-a000-000000000052'),
  (963, '2025-10-16T23:15:38.439Z', '00000000-0000-4000-a000-000000000047', '00000000-0000-4000-a000-00000000005f'),
  (964, '2025-10-15T23:15:38.439Z', '00000000-0000-4000-a000-000000000047', '00000000-0000-4000-a000-000000000008'),
  (965, '2025-10-14T23:15:38.439Z', '00000000-0000-4000-a000-000000000047', '00000000-0000-4000-a000-000000000015'),
  (966, '2025-10-13T23:15:38.439Z', '00000000-0000-4000-a000-000000000047', '00000000-0000-4000-a000-000000000022'),
  (967, '2025-10-12T23:15:38.439Z', '00000000-0000-4000-a000-000000000047', '00000000-0000-4000-a000-00000000002f'),
  (968, '2025-10-11T23:15:38.439Z', '00000000-0000-4000-a000-000000000047', '00000000-0000-4000-a000-00000000003c'),
  (969, '2025-10-10T23:15:38.439Z', '00000000-0000-4000-a000-000000000047', '00000000-0000-4000-a000-000000000049'),
  (970, '2025-10-09T23:15:38.439Z', '00000000-0000-4000-a000-000000000048', '00000000-0000-4000-a000-000000000062'),
  (971, '2025-10-08T23:15:38.439Z', '00000000-0000-4000-a000-000000000048', '00000000-0000-4000-a000-00000000000b'),
  (972, '2025-10-07T23:15:38.439Z', '00000000-0000-4000-a000-000000000048', '00000000-0000-4000-a000-000000000018'),
  (973, '2025-10-06T23:15:38.439Z', '00000000-0000-4000-a000-000000000048', '00000000-0000-4000-a000-000000000025'),
  (974, '2025-10-05T23:15:38.439Z', '00000000-0000-4000-a000-000000000048', '00000000-0000-4000-a000-000000000032'),
  (975, '2025-10-04T23:15:38.439Z', '00000000-0000-4000-a000-000000000048', '00000000-0000-4000-a000-00000000003f'),
  (976, '2025-10-03T23:15:38.439Z', '00000000-0000-4000-a000-000000000048', '00000000-0000-4000-a000-00000000004c'),
  (977, '2025-10-02T23:15:38.439Z', '00000000-0000-4000-a000-000000000048', '00000000-0000-4000-a000-000000000059'),
  (978, '2025-10-01T23:15:38.439Z', '00000000-0000-4000-a000-000000000048', '00000000-0000-4000-a000-000000000002'),
  (979, '2025-09-30T23:15:38.439Z', '00000000-0000-4000-a000-000000000048', '00000000-0000-4000-a000-00000000000f'),
  (980, '2025-09-29T23:15:38.439Z', '00000000-0000-4000-a000-000000000048', '00000000-0000-4000-a000-00000000001c'),
  (981, '2025-09-28T23:15:38.439Z', '00000000-0000-4000-a000-000000000048', '00000000-0000-4000-a000-000000000029'),
  (982, '2025-09-27T23:15:38.439Z', '00000000-0000-4000-a000-000000000048', '00000000-0000-4000-a000-000000000036'),
  (983, '2025-09-26T23:15:38.439Z', '00000000-0000-4000-a000-000000000048', '00000000-0000-4000-a000-000000000043'),
  (984, '2025-09-25T23:15:38.439Z', '00000000-0000-4000-a000-000000000048', '00000000-0000-4000-a000-000000000050'),
  (985, '2025-09-24T23:15:38.439Z', '00000000-0000-4000-a000-000000000048', '00000000-0000-4000-a000-00000000005d'),
  (986, '2025-09-23T23:15:38.439Z', '00000000-0000-4000-a000-000000000049', '00000000-0000-4000-a000-000000000005'),
  (987, '2025-09-22T23:15:38.439Z', '00000000-0000-4000-a000-000000000049', '00000000-0000-4000-a000-000000000012'),
  (988, '2025-09-21T23:15:38.439Z', '00000000-0000-4000-a000-000000000049', '00000000-0000-4000-a000-00000000001f'),
  (989, '2025-09-20T23:15:38.439Z', '00000000-0000-4000-a000-000000000049', '00000000-0000-4000-a000-00000000002c'),
  (990, '2025-09-19T23:15:38.439Z', '00000000-0000-4000-a000-000000000049', '00000000-0000-4000-a000-000000000039'),
  (991, '2025-09-18T23:15:38.439Z', '00000000-0000-4000-a000-000000000049', '00000000-0000-4000-a000-000000000046'),
  (992, '2025-09-17T23:15:38.439Z', '00000000-0000-4000-a000-000000000049', '00000000-0000-4000-a000-000000000053'),
  (993, '2025-09-16T23:15:38.439Z', '00000000-0000-4000-a000-000000000049', '00000000-0000-4000-a000-000000000060'),
  (994, '2025-09-15T23:15:38.439Z', '00000000-0000-4000-a000-000000000049', '00000000-0000-4000-a000-000000000009'),
  (995, '2025-09-14T23:15:38.439Z', '00000000-0000-4000-a000-000000000049', '00000000-0000-4000-a000-000000000016'),
  (996, '2025-09-13T23:15:38.439Z', '00000000-0000-4000-a000-000000000049', '00000000-0000-4000-a000-000000000023'),
  (997, '2025-09-12T23:15:38.439Z', '00000000-0000-4000-a000-000000000049', '00000000-0000-4000-a000-000000000030'),
  (998, '2025-09-11T23:15:38.439Z', '00000000-0000-4000-a000-000000000049', '00000000-0000-4000-a000-00000000003d'),
  (999, '2025-09-10T23:15:38.439Z', '00000000-0000-4000-a000-000000000049', '00000000-0000-4000-a000-00000000004a'),
  (1000, '2025-09-09T23:15:38.439Z', '00000000-0000-4000-a000-000000000049', '00000000-0000-4000-a000-000000000057');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (1001, '2025-09-08T23:15:38.439Z', '00000000-0000-4000-a000-000000000049', '00000000-0000-4000-a000-000000000064'),
  (1002, '2025-09-07T23:15:38.439Z', '00000000-0000-4000-a000-000000000049', '00000000-0000-4000-a000-00000000000d'),
  (1003, '2025-09-06T23:15:38.439Z', '00000000-0000-4000-a000-00000000004a', '00000000-0000-4000-a000-00000000000c'),
  (1004, '2025-09-05T23:15:38.439Z', '00000000-0000-4000-a000-00000000004a', '00000000-0000-4000-a000-000000000019'),
  (1005, '2025-09-04T23:15:38.439Z', '00000000-0000-4000-a000-00000000004a', '00000000-0000-4000-a000-000000000026'),
  (1006, '2025-09-03T23:15:38.439Z', '00000000-0000-4000-a000-00000000004a', '00000000-0000-4000-a000-000000000033'),
  (1007, '2025-09-02T23:15:38.439Z', '00000000-0000-4000-a000-00000000004a', '00000000-0000-4000-a000-000000000040'),
  (1008, '2025-09-01T23:15:38.439Z', '00000000-0000-4000-a000-00000000004a', '00000000-0000-4000-a000-00000000004d'),
  (1009, '2025-08-31T23:15:38.439Z', '00000000-0000-4000-a000-00000000004a', '00000000-0000-4000-a000-00000000005a'),
  (1010, '2025-08-30T23:15:38.439Z', '00000000-0000-4000-a000-00000000004a', '00000000-0000-4000-a000-000000000003'),
  (1011, '2025-08-29T23:15:38.439Z', '00000000-0000-4000-a000-00000000004a', '00000000-0000-4000-a000-000000000010'),
  (1012, '2025-08-28T23:15:38.439Z', '00000000-0000-4000-a000-00000000004a', '00000000-0000-4000-a000-00000000001d'),
  (1013, '2025-08-27T23:15:38.439Z', '00000000-0000-4000-a000-00000000004a', '00000000-0000-4000-a000-00000000002a'),
  (1014, '2025-08-26T23:15:38.439Z', '00000000-0000-4000-a000-00000000004a', '00000000-0000-4000-a000-000000000037'),
  (1015, '2025-08-25T23:15:38.439Z', '00000000-0000-4000-a000-00000000004a', '00000000-0000-4000-a000-000000000044'),
  (1016, '2025-08-24T23:15:38.439Z', '00000000-0000-4000-a000-00000000004a', '00000000-0000-4000-a000-000000000051'),
  (1017, '2025-08-23T23:15:38.439Z', '00000000-0000-4000-a000-00000000004a', '00000000-0000-4000-a000-00000000005e'),
  (1018, '2025-08-22T23:15:38.439Z', '00000000-0000-4000-a000-00000000004a', '00000000-0000-4000-a000-000000000007'),
  (1019, '2025-08-21T23:15:38.439Z', '00000000-0000-4000-a000-00000000004a', '00000000-0000-4000-a000-000000000014'),
  (1020, '2025-08-20T23:15:38.439Z', '00000000-0000-4000-a000-00000000004a', '00000000-0000-4000-a000-000000000021'),
  (1021, '2025-08-19T23:15:38.439Z', '00000000-0000-4000-a000-00000000004b', '00000000-0000-4000-a000-000000000013'),
  (1022, '2025-08-18T23:15:38.439Z', '00000000-0000-4000-a000-00000000004b', '00000000-0000-4000-a000-000000000020'),
  (1023, '2025-08-17T23:15:38.439Z', '00000000-0000-4000-a000-00000000004b', '00000000-0000-4000-a000-00000000002d'),
  (1024, '2025-08-16T23:15:38.439Z', '00000000-0000-4000-a000-00000000004b', '00000000-0000-4000-a000-00000000003a'),
  (1025, '2025-08-15T23:15:38.439Z', '00000000-0000-4000-a000-00000000004b', '00000000-0000-4000-a000-000000000047'),
  (1026, '2025-08-14T23:15:38.439Z', '00000000-0000-4000-a000-00000000004b', '00000000-0000-4000-a000-000000000054'),
  (1027, '2025-08-13T23:15:38.439Z', '00000000-0000-4000-a000-00000000004b', '00000000-0000-4000-a000-000000000061'),
  (1028, '2025-08-12T23:15:38.439Z', '00000000-0000-4000-a000-00000000004b', '00000000-0000-4000-a000-00000000000a'),
  (1029, '2025-08-11T23:15:38.439Z', '00000000-0000-4000-a000-00000000004b', '00000000-0000-4000-a000-000000000017'),
  (1030, '2025-08-10T23:15:38.439Z', '00000000-0000-4000-a000-00000000004b', '00000000-0000-4000-a000-000000000024'),
  (1031, '2025-08-09T23:15:38.439Z', '00000000-0000-4000-a000-00000000004b', '00000000-0000-4000-a000-000000000031'),
  (1032, '2025-08-08T23:15:38.439Z', '00000000-0000-4000-a000-00000000004b', '00000000-0000-4000-a000-00000000003e'),
  (1033, '2025-08-07T23:15:38.439Z', '00000000-0000-4000-a000-00000000004b', '00000000-0000-4000-a000-000000000058'),
  (1034, '2025-08-06T23:15:38.439Z', '00000000-0000-4000-a000-00000000004b', '00000000-0000-4000-a000-000000000001'),
  (1035, '2025-08-05T23:15:38.439Z', '00000000-0000-4000-a000-00000000004b', '00000000-0000-4000-a000-00000000000e'),
  (1036, '2025-08-04T23:15:38.439Z', '00000000-0000-4000-a000-00000000004b', '00000000-0000-4000-a000-00000000001b'),
  (1037, '2025-08-03T23:15:38.439Z', '00000000-0000-4000-a000-00000000004b', '00000000-0000-4000-a000-000000000028'),
  (1038, '2025-08-02T23:15:38.439Z', '00000000-0000-4000-a000-00000000004b', '00000000-0000-4000-a000-000000000035'),
  (1039, '2025-08-01T23:15:38.439Z', '00000000-0000-4000-a000-00000000004c', '00000000-0000-4000-a000-00000000001a'),
  (1040, '2025-07-31T23:15:38.439Z', '00000000-0000-4000-a000-00000000004c', '00000000-0000-4000-a000-000000000027'),
  (1041, '2025-07-30T23:15:38.439Z', '00000000-0000-4000-a000-00000000004c', '00000000-0000-4000-a000-000000000034'),
  (1042, '2025-07-29T23:15:38.439Z', '00000000-0000-4000-a000-00000000004c', '00000000-0000-4000-a000-000000000041'),
  (1043, '2025-07-28T23:15:38.439Z', '00000000-0000-4000-a000-00000000004c', '00000000-0000-4000-a000-00000000004e'),
  (1044, '2025-07-27T23:15:38.439Z', '00000000-0000-4000-a000-00000000004c', '00000000-0000-4000-a000-00000000005b'),
  (1045, '2025-07-26T23:15:38.439Z', '00000000-0000-4000-a000-00000000004c', '00000000-0000-4000-a000-000000000004'),
  (1046, '2025-07-25T23:15:38.439Z', '00000000-0000-4000-a000-00000000004c', '00000000-0000-4000-a000-000000000011'),
  (1047, '2025-07-24T23:15:38.439Z', '00000000-0000-4000-a000-00000000004c', '00000000-0000-4000-a000-00000000001e'),
  (1048, '2025-07-23T23:15:38.439Z', '00000000-0000-4000-a000-00000000004c', '00000000-0000-4000-a000-00000000002b'),
  (1049, '2025-07-22T23:15:38.439Z', '00000000-0000-4000-a000-00000000004c', '00000000-0000-4000-a000-000000000038'),
  (1050, '2025-07-21T23:15:38.439Z', '00000000-0000-4000-a000-00000000004c', '00000000-0000-4000-a000-000000000045');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (1051, '2025-07-20T23:15:38.439Z', '00000000-0000-4000-a000-00000000004c', '00000000-0000-4000-a000-000000000052'),
  (1052, '2025-07-19T23:15:38.439Z', '00000000-0000-4000-a000-00000000004c', '00000000-0000-4000-a000-00000000005f'),
  (1053, '2025-07-18T23:15:38.439Z', '00000000-0000-4000-a000-00000000004c', '00000000-0000-4000-a000-000000000008'),
  (1054, '2025-07-17T23:15:38.439Z', '00000000-0000-4000-a000-00000000004c', '00000000-0000-4000-a000-000000000015'),
  (1055, '2025-07-16T23:15:38.439Z', '00000000-0000-4000-a000-00000000004c', '00000000-0000-4000-a000-000000000022'),
  (1056, '2025-07-15T23:15:38.439Z', '00000000-0000-4000-a000-00000000004c', '00000000-0000-4000-a000-00000000002f'),
  (1057, '2025-07-14T23:15:38.439Z', '00000000-0000-4000-a000-00000000004c', '00000000-0000-4000-a000-00000000003c'),
  (1058, '2025-07-13T23:15:38.439Z', '00000000-0000-4000-a000-00000000004c', '00000000-0000-4000-a000-000000000049'),
  (1059, '2025-07-12T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-000000000021'),
  (1060, '2025-07-11T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-00000000002e'),
  (1061, '2025-07-10T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-00000000003b'),
  (1062, '2025-07-09T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-000000000048'),
  (1063, '2025-07-08T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-000000000055'),
  (1064, '2025-07-07T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-000000000062'),
  (1065, '2025-07-06T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-00000000000b'),
  (1066, '2025-07-05T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-000000000018'),
  (1067, '2025-07-04T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-000000000025'),
  (1068, '2025-07-03T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-000000000032'),
  (1069, '2025-07-02T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-00000000003f'),
  (1070, '2025-07-01T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-00000000004c'),
  (1071, '2025-06-30T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-000000000059'),
  (1072, '2025-06-29T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-000000000002'),
  (1073, '2025-06-28T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-00000000000f'),
  (1074, '2025-06-27T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-00000000001c'),
  (1075, '2025-06-26T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-000000000029'),
  (1076, '2025-06-25T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-000000000036'),
  (1077, '2025-06-24T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-000000000043'),
  (1078, '2025-06-23T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-000000000050'),
  (1079, '2025-06-22T23:15:38.439Z', '00000000-0000-4000-a000-00000000004d', '00000000-0000-4000-a000-00000000005d'),
  (1080, '2025-06-21T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-000000000028'),
  (1081, '2025-06-20T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-000000000035'),
  (1082, '2025-06-19T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-000000000042'),
  (1083, '2025-06-18T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-00000000004f'),
  (1084, '2025-06-17T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-00000000005c'),
  (1085, '2025-06-16T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-000000000005'),
  (1086, '2025-06-15T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-000000000012'),
  (1087, '2025-06-14T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-00000000001f'),
  (1088, '2025-06-13T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-00000000002c'),
  (1089, '2025-06-12T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-000000000039'),
  (1090, '2025-06-11T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-000000000046'),
  (1091, '2025-06-10T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-000000000053'),
  (1092, '2025-06-09T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-000000000060'),
  (1093, '2025-06-08T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-000000000009'),
  (1094, '2025-06-07T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-000000000016'),
  (1095, '2026-06-06T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-000000000023'),
  (1096, '2026-06-05T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-000000000030'),
  (1097, '2026-06-04T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-00000000003d'),
  (1098, '2026-06-03T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-00000000004a'),
  (1099, '2026-06-02T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-000000000057'),
  (1100, '2026-06-01T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-000000000064');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (1101, '2026-05-31T23:15:38.439Z', '00000000-0000-4000-a000-00000000004e', '00000000-0000-4000-a000-00000000000d'),
  (1102, '2026-05-30T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-00000000002f'),
  (1103, '2026-05-29T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-00000000003c'),
  (1104, '2026-05-28T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-000000000049'),
  (1105, '2026-05-27T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-000000000056'),
  (1106, '2026-05-26T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-000000000063'),
  (1107, '2026-05-25T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-00000000000c'),
  (1108, '2026-05-24T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-000000000019'),
  (1109, '2026-05-23T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-000000000026'),
  (1110, '2026-05-22T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-000000000033'),
  (1111, '2026-05-21T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-000000000040'),
  (1112, '2026-05-20T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-00000000004d'),
  (1113, '2026-05-19T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-00000000005a'),
  (1114, '2026-05-18T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-000000000003'),
  (1115, '2026-05-17T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-000000000010'),
  (1116, '2026-05-16T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-00000000001d'),
  (1117, '2026-05-15T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-00000000002a'),
  (1118, '2026-05-14T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-000000000037'),
  (1119, '2026-05-13T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-000000000044'),
  (1120, '2026-05-12T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-000000000051'),
  (1121, '2026-05-11T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-00000000005e'),
  (1122, '2026-05-10T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-000000000007'),
  (1123, '2026-05-09T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-000000000014'),
  (1124, '2026-05-08T23:15:38.439Z', '00000000-0000-4000-a000-00000000004f', '00000000-0000-4000-a000-000000000021'),
  (1125, '2026-05-07T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-000000000036'),
  (1126, '2026-05-06T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-000000000043'),
  (1127, '2026-05-05T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-00000000005d'),
  (1128, '2026-05-04T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-000000000006'),
  (1129, '2026-05-03T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-000000000013'),
  (1130, '2026-05-02T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-000000000020'),
  (1131, '2026-05-01T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-00000000002d'),
  (1132, '2026-04-30T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-00000000003a'),
  (1133, '2026-04-29T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-000000000047'),
  (1134, '2026-04-28T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-000000000054'),
  (1135, '2026-04-27T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-000000000061'),
  (1136, '2026-04-26T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-00000000000a'),
  (1137, '2026-04-25T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-000000000017'),
  (1138, '2026-04-24T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-000000000024'),
  (1139, '2026-04-23T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-000000000031'),
  (1140, '2026-04-22T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-00000000003e'),
  (1141, '2026-04-21T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-00000000004b'),
  (1142, '2026-04-20T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-000000000058'),
  (1143, '2026-04-19T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-000000000001'),
  (1144, '2026-04-18T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-00000000000e'),
  (1145, '2026-04-17T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-00000000001b'),
  (1146, '2026-04-16T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-000000000028'),
  (1147, '2026-04-15T23:15:38.439Z', '00000000-0000-4000-a000-000000000050', '00000000-0000-4000-a000-000000000035'),
  (1148, '2026-04-14T23:15:38.439Z', '00000000-0000-4000-a000-000000000051', '00000000-0000-4000-a000-00000000003d'),
  (1149, '2026-04-13T23:15:38.439Z', '00000000-0000-4000-a000-000000000051', '00000000-0000-4000-a000-00000000004a'),
  (1150, '2026-04-12T23:15:38.439Z', '00000000-0000-4000-a000-000000000051', '00000000-0000-4000-a000-000000000057');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (1151, '2026-04-11T23:15:38.439Z', '00000000-0000-4000-a000-000000000051', '00000000-0000-4000-a000-000000000064'),
  (1152, '2026-04-10T23:15:38.439Z', '00000000-0000-4000-a000-000000000051', '00000000-0000-4000-a000-00000000000d'),
  (1153, '2026-04-09T23:15:38.439Z', '00000000-0000-4000-a000-000000000052', '00000000-0000-4000-a000-000000000044'),
  (1154, '2026-04-08T23:15:38.439Z', '00000000-0000-4000-a000-000000000052', '00000000-0000-4000-a000-000000000051'),
  (1155, '2026-04-07T23:15:38.439Z', '00000000-0000-4000-a000-000000000052', '00000000-0000-4000-a000-00000000005e'),
  (1156, '2026-04-06T23:15:38.439Z', '00000000-0000-4000-a000-000000000052', '00000000-0000-4000-a000-000000000007'),
  (1157, '2026-04-05T23:15:38.439Z', '00000000-0000-4000-a000-000000000052', '00000000-0000-4000-a000-000000000014'),
  (1158, '2026-04-04T23:15:38.439Z', '00000000-0000-4000-a000-000000000052', '00000000-0000-4000-a000-000000000021'),
  (1159, '2026-04-03T23:15:38.439Z', '00000000-0000-4000-a000-000000000053', '00000000-0000-4000-a000-00000000004b'),
  (1160, '2026-04-02T23:15:38.439Z', '00000000-0000-4000-a000-000000000053', '00000000-0000-4000-a000-000000000058'),
  (1161, '2026-04-01T23:15:38.439Z', '00000000-0000-4000-a000-000000000053', '00000000-0000-4000-a000-000000000001'),
  (1162, '2026-03-31T23:15:38.439Z', '00000000-0000-4000-a000-000000000053', '00000000-0000-4000-a000-00000000000e'),
  (1163, '2026-03-30T23:15:38.439Z', '00000000-0000-4000-a000-000000000053', '00000000-0000-4000-a000-00000000001b'),
  (1164, '2026-03-29T23:15:38.439Z', '00000000-0000-4000-a000-000000000053', '00000000-0000-4000-a000-000000000028'),
  (1165, '2026-03-28T23:15:38.439Z', '00000000-0000-4000-a000-000000000053', '00000000-0000-4000-a000-000000000035'),
  (1166, '2026-03-27T23:15:38.439Z', '00000000-0000-4000-a000-000000000054', '00000000-0000-4000-a000-000000000052'),
  (1167, '2026-03-26T23:15:38.439Z', '00000000-0000-4000-a000-000000000054', '00000000-0000-4000-a000-00000000005f'),
  (1168, '2026-03-25T23:15:38.439Z', '00000000-0000-4000-a000-000000000054', '00000000-0000-4000-a000-000000000008'),
  (1169, '2026-03-24T23:15:38.439Z', '00000000-0000-4000-a000-000000000054', '00000000-0000-4000-a000-000000000015'),
  (1170, '2026-03-23T23:15:38.440Z', '00000000-0000-4000-a000-000000000054', '00000000-0000-4000-a000-000000000022'),
  (1171, '2026-03-22T23:15:38.440Z', '00000000-0000-4000-a000-000000000054', '00000000-0000-4000-a000-00000000002f'),
  (1172, '2026-03-21T23:15:38.440Z', '00000000-0000-4000-a000-000000000054', '00000000-0000-4000-a000-00000000003c'),
  (1173, '2026-03-20T23:15:38.440Z', '00000000-0000-4000-a000-000000000054', '00000000-0000-4000-a000-000000000049'),
  (1174, '2026-03-19T23:15:38.440Z', '00000000-0000-4000-a000-000000000055', '00000000-0000-4000-a000-000000000059'),
  (1175, '2026-03-18T23:15:38.440Z', '00000000-0000-4000-a000-000000000055', '00000000-0000-4000-a000-000000000002'),
  (1176, '2026-03-17T23:15:38.440Z', '00000000-0000-4000-a000-000000000055', '00000000-0000-4000-a000-00000000000f'),
  (1177, '2026-03-16T23:15:38.440Z', '00000000-0000-4000-a000-000000000055', '00000000-0000-4000-a000-00000000001c'),
  (1178, '2026-03-15T23:15:38.440Z', '00000000-0000-4000-a000-000000000055', '00000000-0000-4000-a000-000000000029'),
  (1179, '2026-03-14T23:15:38.440Z', '00000000-0000-4000-a000-000000000055', '00000000-0000-4000-a000-000000000036'),
  (1180, '2026-03-13T23:15:38.440Z', '00000000-0000-4000-a000-000000000055', '00000000-0000-4000-a000-000000000043'),
  (1181, '2026-03-12T23:15:38.440Z', '00000000-0000-4000-a000-000000000055', '00000000-0000-4000-a000-000000000050'),
  (1182, '2026-03-11T23:15:38.440Z', '00000000-0000-4000-a000-000000000055', '00000000-0000-4000-a000-00000000005d'),
  (1183, '2026-03-10T23:15:38.440Z', '00000000-0000-4000-a000-000000000056', '00000000-0000-4000-a000-000000000060'),
  (1184, '2026-03-09T23:15:38.440Z', '00000000-0000-4000-a000-000000000056', '00000000-0000-4000-a000-000000000009'),
  (1185, '2026-03-08T23:15:38.440Z', '00000000-0000-4000-a000-000000000056', '00000000-0000-4000-a000-000000000016'),
  (1186, '2026-03-07T23:15:38.440Z', '00000000-0000-4000-a000-000000000056', '00000000-0000-4000-a000-000000000023'),
  (1187, '2026-03-06T23:15:38.440Z', '00000000-0000-4000-a000-000000000056', '00000000-0000-4000-a000-000000000030'),
  (1188, '2026-03-05T23:15:38.440Z', '00000000-0000-4000-a000-000000000056', '00000000-0000-4000-a000-00000000003d'),
  (1189, '2026-03-04T23:15:38.440Z', '00000000-0000-4000-a000-000000000056', '00000000-0000-4000-a000-00000000004a'),
  (1190, '2026-03-03T23:15:38.440Z', '00000000-0000-4000-a000-000000000056', '00000000-0000-4000-a000-000000000057'),
  (1191, '2026-03-02T23:15:38.440Z', '00000000-0000-4000-a000-000000000056', '00000000-0000-4000-a000-000000000064'),
  (1192, '2026-03-01T23:15:38.440Z', '00000000-0000-4000-a000-000000000056', '00000000-0000-4000-a000-00000000000d'),
  (1193, '2026-02-28T23:15:38.440Z', '00000000-0000-4000-a000-000000000057', '00000000-0000-4000-a000-000000000003'),
  (1194, '2026-02-27T23:15:38.440Z', '00000000-0000-4000-a000-000000000057', '00000000-0000-4000-a000-000000000010'),
  (1195, '2026-02-26T23:15:38.440Z', '00000000-0000-4000-a000-000000000057', '00000000-0000-4000-a000-00000000001d'),
  (1196, '2026-02-25T23:15:38.440Z', '00000000-0000-4000-a000-000000000057', '00000000-0000-4000-a000-00000000002a'),
  (1197, '2026-02-24T23:15:38.440Z', '00000000-0000-4000-a000-000000000057', '00000000-0000-4000-a000-000000000037'),
  (1198, '2026-02-23T23:15:38.440Z', '00000000-0000-4000-a000-000000000057', '00000000-0000-4000-a000-000000000044'),
  (1199, '2026-02-22T23:15:38.440Z', '00000000-0000-4000-a000-000000000057', '00000000-0000-4000-a000-000000000051'),
  (1200, '2026-02-21T23:15:38.440Z', '00000000-0000-4000-a000-000000000057', '00000000-0000-4000-a000-00000000005e');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (1201, '2026-02-20T23:15:38.440Z', '00000000-0000-4000-a000-000000000057', '00000000-0000-4000-a000-000000000007'),
  (1202, '2026-02-19T23:15:38.440Z', '00000000-0000-4000-a000-000000000057', '00000000-0000-4000-a000-000000000014'),
  (1203, '2026-02-18T23:15:38.440Z', '00000000-0000-4000-a000-000000000057', '00000000-0000-4000-a000-000000000021'),
  (1204, '2026-02-17T23:15:38.440Z', '00000000-0000-4000-a000-000000000058', '00000000-0000-4000-a000-00000000000a'),
  (1205, '2026-02-16T23:15:38.440Z', '00000000-0000-4000-a000-000000000058', '00000000-0000-4000-a000-000000000017'),
  (1206, '2026-02-15T23:15:38.440Z', '00000000-0000-4000-a000-000000000058', '00000000-0000-4000-a000-000000000024'),
  (1207, '2026-02-14T23:15:38.440Z', '00000000-0000-4000-a000-000000000058', '00000000-0000-4000-a000-000000000031'),
  (1208, '2026-02-13T23:15:38.440Z', '00000000-0000-4000-a000-000000000058', '00000000-0000-4000-a000-00000000003e'),
  (1209, '2026-02-12T23:15:38.440Z', '00000000-0000-4000-a000-000000000058', '00000000-0000-4000-a000-00000000004b'),
  (1210, '2026-02-11T23:15:38.440Z', '00000000-0000-4000-a000-000000000058', '00000000-0000-4000-a000-000000000001'),
  (1211, '2026-02-10T23:15:38.440Z', '00000000-0000-4000-a000-000000000058', '00000000-0000-4000-a000-00000000000e'),
  (1212, '2026-02-09T23:15:38.440Z', '00000000-0000-4000-a000-000000000058', '00000000-0000-4000-a000-00000000001b'),
  (1213, '2026-02-08T23:15:38.440Z', '00000000-0000-4000-a000-000000000058', '00000000-0000-4000-a000-000000000028'),
  (1214, '2026-02-07T23:15:38.440Z', '00000000-0000-4000-a000-000000000058', '00000000-0000-4000-a000-000000000035'),
  (1215, '2026-02-06T23:15:38.440Z', '00000000-0000-4000-a000-000000000059', '00000000-0000-4000-a000-000000000011'),
  (1216, '2026-02-05T23:15:38.440Z', '00000000-0000-4000-a000-000000000059', '00000000-0000-4000-a000-00000000001e'),
  (1217, '2026-02-04T23:15:38.440Z', '00000000-0000-4000-a000-000000000059', '00000000-0000-4000-a000-00000000002b'),
  (1218, '2026-02-03T23:15:38.440Z', '00000000-0000-4000-a000-000000000059', '00000000-0000-4000-a000-000000000038'),
  (1219, '2026-02-02T23:15:38.440Z', '00000000-0000-4000-a000-000000000059', '00000000-0000-4000-a000-000000000045'),
  (1220, '2026-02-01T23:15:38.440Z', '00000000-0000-4000-a000-000000000059', '00000000-0000-4000-a000-000000000052'),
  (1221, '2026-01-31T23:15:38.440Z', '00000000-0000-4000-a000-000000000059', '00000000-0000-4000-a000-00000000005f'),
  (1222, '2026-01-30T23:15:38.440Z', '00000000-0000-4000-a000-000000000059', '00000000-0000-4000-a000-000000000008'),
  (1223, '2026-01-29T23:15:38.440Z', '00000000-0000-4000-a000-000000000059', '00000000-0000-4000-a000-000000000015'),
  (1224, '2026-01-28T23:15:38.440Z', '00000000-0000-4000-a000-000000000059', '00000000-0000-4000-a000-000000000022'),
  (1225, '2026-01-27T23:15:38.440Z', '00000000-0000-4000-a000-000000000059', '00000000-0000-4000-a000-00000000002f'),
  (1226, '2026-01-26T23:15:38.440Z', '00000000-0000-4000-a000-000000000059', '00000000-0000-4000-a000-00000000003c'),
  (1227, '2026-01-25T23:15:38.440Z', '00000000-0000-4000-a000-000000000059', '00000000-0000-4000-a000-000000000049'),
  (1228, '2026-01-24T23:15:38.440Z', '00000000-0000-4000-a000-00000000005a', '00000000-0000-4000-a000-000000000018'),
  (1229, '2026-01-23T23:15:38.440Z', '00000000-0000-4000-a000-00000000005a', '00000000-0000-4000-a000-000000000025'),
  (1230, '2026-01-22T23:15:38.440Z', '00000000-0000-4000-a000-00000000005a', '00000000-0000-4000-a000-000000000032'),
  (1231, '2026-01-21T23:15:38.440Z', '00000000-0000-4000-a000-00000000005a', '00000000-0000-4000-a000-00000000003f'),
  (1232, '2026-01-20T23:15:38.440Z', '00000000-0000-4000-a000-00000000005a', '00000000-0000-4000-a000-00000000004c'),
  (1233, '2026-01-19T23:15:38.440Z', '00000000-0000-4000-a000-00000000005a', '00000000-0000-4000-a000-000000000059'),
  (1234, '2026-01-18T23:15:38.440Z', '00000000-0000-4000-a000-00000000005a', '00000000-0000-4000-a000-000000000002'),
  (1235, '2026-01-17T23:15:38.440Z', '00000000-0000-4000-a000-00000000005a', '00000000-0000-4000-a000-00000000000f'),
  (1236, '2026-01-16T23:15:38.440Z', '00000000-0000-4000-a000-00000000005a', '00000000-0000-4000-a000-00000000001c'),
  (1237, '2026-01-15T23:15:38.440Z', '00000000-0000-4000-a000-00000000005a', '00000000-0000-4000-a000-000000000029'),
  (1238, '2026-01-14T23:15:38.440Z', '00000000-0000-4000-a000-00000000005a', '00000000-0000-4000-a000-000000000036'),
  (1239, '2026-01-13T23:15:38.440Z', '00000000-0000-4000-a000-00000000005a', '00000000-0000-4000-a000-000000000043'),
  (1240, '2026-01-12T23:15:38.440Z', '00000000-0000-4000-a000-00000000005a', '00000000-0000-4000-a000-000000000050'),
  (1241, '2026-01-11T23:15:38.440Z', '00000000-0000-4000-a000-00000000005a', '00000000-0000-4000-a000-00000000005d'),
  (1242, '2026-01-10T23:15:38.440Z', '00000000-0000-4000-a000-00000000005b', '00000000-0000-4000-a000-00000000001f'),
  (1243, '2026-01-09T23:15:38.440Z', '00000000-0000-4000-a000-00000000005b', '00000000-0000-4000-a000-00000000002c'),
  (1244, '2026-01-08T23:15:38.440Z', '00000000-0000-4000-a000-00000000005b', '00000000-0000-4000-a000-000000000039'),
  (1245, '2026-01-07T23:15:38.440Z', '00000000-0000-4000-a000-00000000005b', '00000000-0000-4000-a000-000000000046'),
  (1246, '2026-01-06T23:15:38.440Z', '00000000-0000-4000-a000-00000000005b', '00000000-0000-4000-a000-000000000053'),
  (1247, '2026-01-05T23:15:38.440Z', '00000000-0000-4000-a000-00000000005b', '00000000-0000-4000-a000-000000000060'),
  (1248, '2026-01-04T23:15:38.440Z', '00000000-0000-4000-a000-00000000005b', '00000000-0000-4000-a000-000000000009'),
  (1249, '2026-01-03T23:15:38.440Z', '00000000-0000-4000-a000-00000000005b', '00000000-0000-4000-a000-000000000016'),
  (1250, '2026-01-02T23:15:38.440Z', '00000000-0000-4000-a000-00000000005b', '00000000-0000-4000-a000-000000000023');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (1251, '2026-01-01T23:15:38.440Z', '00000000-0000-4000-a000-00000000005b', '00000000-0000-4000-a000-000000000030'),
  (1252, '2025-12-31T23:15:38.440Z', '00000000-0000-4000-a000-00000000005b', '00000000-0000-4000-a000-00000000003d'),
  (1253, '2025-12-30T23:15:38.440Z', '00000000-0000-4000-a000-00000000005b', '00000000-0000-4000-a000-00000000004a'),
  (1254, '2025-12-29T23:15:38.440Z', '00000000-0000-4000-a000-00000000005b', '00000000-0000-4000-a000-000000000057'),
  (1255, '2025-12-28T23:15:38.440Z', '00000000-0000-4000-a000-00000000005b', '00000000-0000-4000-a000-000000000064'),
  (1256, '2025-12-27T23:15:38.440Z', '00000000-0000-4000-a000-00000000005b', '00000000-0000-4000-a000-00000000000d'),
  (1257, '2025-12-26T23:15:38.440Z', '00000000-0000-4000-a000-00000000005c', '00000000-0000-4000-a000-000000000026'),
  (1258, '2025-12-25T23:15:38.440Z', '00000000-0000-4000-a000-00000000005c', '00000000-0000-4000-a000-000000000033'),
  (1259, '2025-12-24T23:15:38.440Z', '00000000-0000-4000-a000-00000000005c', '00000000-0000-4000-a000-000000000040'),
  (1260, '2025-12-23T23:15:38.440Z', '00000000-0000-4000-a000-00000000005c', '00000000-0000-4000-a000-00000000004d'),
  (1261, '2025-12-22T23:15:38.440Z', '00000000-0000-4000-a000-00000000005c', '00000000-0000-4000-a000-00000000005a'),
  (1262, '2025-12-21T23:15:38.440Z', '00000000-0000-4000-a000-00000000005c', '00000000-0000-4000-a000-000000000003'),
  (1263, '2025-12-20T23:15:38.440Z', '00000000-0000-4000-a000-00000000005c', '00000000-0000-4000-a000-000000000010'),
  (1264, '2025-12-19T23:15:38.440Z', '00000000-0000-4000-a000-00000000005c', '00000000-0000-4000-a000-00000000001d'),
  (1265, '2025-12-18T23:15:38.440Z', '00000000-0000-4000-a000-00000000005c', '00000000-0000-4000-a000-00000000002a'),
  (1266, '2025-12-17T23:15:38.440Z', '00000000-0000-4000-a000-00000000005c', '00000000-0000-4000-a000-000000000037'),
  (1267, '2025-12-16T23:15:38.440Z', '00000000-0000-4000-a000-00000000005c', '00000000-0000-4000-a000-000000000044'),
  (1268, '2025-12-15T23:15:38.440Z', '00000000-0000-4000-a000-00000000005c', '00000000-0000-4000-a000-000000000051'),
  (1269, '2025-12-14T23:15:38.440Z', '00000000-0000-4000-a000-00000000005c', '00000000-0000-4000-a000-00000000005e'),
  (1270, '2025-12-13T23:15:38.440Z', '00000000-0000-4000-a000-00000000005c', '00000000-0000-4000-a000-000000000007'),
  (1271, '2025-12-12T23:15:38.440Z', '00000000-0000-4000-a000-00000000005c', '00000000-0000-4000-a000-000000000014'),
  (1272, '2025-12-11T23:15:38.440Z', '00000000-0000-4000-a000-00000000005c', '00000000-0000-4000-a000-000000000021'),
  (1273, '2025-12-10T23:15:38.440Z', '00000000-0000-4000-a000-00000000005d', '00000000-0000-4000-a000-00000000002d'),
  (1274, '2025-12-09T23:15:38.440Z', '00000000-0000-4000-a000-00000000005d', '00000000-0000-4000-a000-00000000003a'),
  (1275, '2025-12-08T23:15:38.440Z', '00000000-0000-4000-a000-00000000005d', '00000000-0000-4000-a000-000000000047'),
  (1276, '2025-12-07T23:15:38.440Z', '00000000-0000-4000-a000-00000000005d', '00000000-0000-4000-a000-000000000054'),
  (1277, '2025-12-06T23:15:38.440Z', '00000000-0000-4000-a000-00000000005d', '00000000-0000-4000-a000-000000000061'),
  (1278, '2025-12-05T23:15:38.440Z', '00000000-0000-4000-a000-00000000005d', '00000000-0000-4000-a000-00000000000a'),
  (1279, '2025-12-04T23:15:38.440Z', '00000000-0000-4000-a000-00000000005d', '00000000-0000-4000-a000-000000000017'),
  (1280, '2025-12-03T23:15:38.440Z', '00000000-0000-4000-a000-00000000005d', '00000000-0000-4000-a000-000000000024'),
  (1281, '2025-12-02T23:15:38.440Z', '00000000-0000-4000-a000-00000000005d', '00000000-0000-4000-a000-000000000031'),
  (1282, '2025-12-01T23:15:38.440Z', '00000000-0000-4000-a000-00000000005d', '00000000-0000-4000-a000-00000000003e'),
  (1283, '2025-11-30T23:15:38.440Z', '00000000-0000-4000-a000-00000000005d', '00000000-0000-4000-a000-00000000004b'),
  (1284, '2025-11-29T23:15:38.440Z', '00000000-0000-4000-a000-00000000005d', '00000000-0000-4000-a000-000000000058'),
  (1285, '2025-11-28T23:15:38.440Z', '00000000-0000-4000-a000-00000000005d', '00000000-0000-4000-a000-000000000001'),
  (1286, '2025-11-27T23:15:38.440Z', '00000000-0000-4000-a000-00000000005d', '00000000-0000-4000-a000-00000000000e'),
  (1287, '2025-11-26T23:15:38.440Z', '00000000-0000-4000-a000-00000000005d', '00000000-0000-4000-a000-00000000001b'),
  (1288, '2025-11-25T23:15:38.440Z', '00000000-0000-4000-a000-00000000005d', '00000000-0000-4000-a000-000000000028'),
  (1289, '2025-11-24T23:15:38.440Z', '00000000-0000-4000-a000-00000000005d', '00000000-0000-4000-a000-000000000035'),
  (1290, '2025-11-23T23:15:38.440Z', '00000000-0000-4000-a000-00000000005e', '00000000-0000-4000-a000-000000000034'),
  (1291, '2025-11-22T23:15:38.440Z', '00000000-0000-4000-a000-00000000005e', '00000000-0000-4000-a000-000000000041'),
  (1292, '2025-11-21T23:15:38.440Z', '00000000-0000-4000-a000-00000000005e', '00000000-0000-4000-a000-00000000004e'),
  (1293, '2025-11-20T23:15:38.440Z', '00000000-0000-4000-a000-00000000005e', '00000000-0000-4000-a000-00000000005b'),
  (1294, '2025-11-19T23:15:38.440Z', '00000000-0000-4000-a000-00000000005e', '00000000-0000-4000-a000-000000000004'),
  (1295, '2025-11-18T23:15:38.440Z', '00000000-0000-4000-a000-00000000005e', '00000000-0000-4000-a000-000000000011'),
  (1296, '2025-11-17T23:15:38.440Z', '00000000-0000-4000-a000-00000000005e', '00000000-0000-4000-a000-00000000001e'),
  (1297, '2025-11-16T23:15:38.440Z', '00000000-0000-4000-a000-00000000005e', '00000000-0000-4000-a000-00000000002b'),
  (1298, '2025-11-15T23:15:38.440Z', '00000000-0000-4000-a000-00000000005e', '00000000-0000-4000-a000-000000000038'),
  (1299, '2025-11-14T23:15:38.440Z', '00000000-0000-4000-a000-00000000005e', '00000000-0000-4000-a000-000000000045'),
  (1300, '2025-11-13T23:15:38.440Z', '00000000-0000-4000-a000-00000000005e', '00000000-0000-4000-a000-000000000052');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (1301, '2025-11-12T23:15:38.440Z', '00000000-0000-4000-a000-00000000005e', '00000000-0000-4000-a000-00000000005f'),
  (1302, '2025-11-11T23:15:38.440Z', '00000000-0000-4000-a000-00000000005e', '00000000-0000-4000-a000-000000000008'),
  (1303, '2025-11-10T23:15:38.440Z', '00000000-0000-4000-a000-00000000005e', '00000000-0000-4000-a000-000000000015'),
  (1304, '2025-11-09T23:15:38.440Z', '00000000-0000-4000-a000-00000000005e', '00000000-0000-4000-a000-000000000022'),
  (1305, '2025-11-08T23:15:38.440Z', '00000000-0000-4000-a000-00000000005e', '00000000-0000-4000-a000-00000000002f'),
  (1306, '2025-11-07T23:15:38.440Z', '00000000-0000-4000-a000-00000000005e', '00000000-0000-4000-a000-00000000003c'),
  (1307, '2025-11-06T23:15:38.440Z', '00000000-0000-4000-a000-00000000005e', '00000000-0000-4000-a000-000000000049'),
  (1308, '2025-11-05T23:15:38.440Z', '00000000-0000-4000-a000-00000000005f', '00000000-0000-4000-a000-00000000003b'),
  (1309, '2025-11-04T23:15:38.440Z', '00000000-0000-4000-a000-00000000005f', '00000000-0000-4000-a000-000000000048'),
  (1310, '2025-11-03T23:15:38.440Z', '00000000-0000-4000-a000-00000000005f', '00000000-0000-4000-a000-000000000055'),
  (1311, '2025-11-02T23:15:38.440Z', '00000000-0000-4000-a000-00000000005f', '00000000-0000-4000-a000-000000000062'),
  (1312, '2025-11-01T23:15:38.440Z', '00000000-0000-4000-a000-00000000005f', '00000000-0000-4000-a000-00000000000b'),
  (1313, '2025-10-31T23:15:38.440Z', '00000000-0000-4000-a000-00000000005f', '00000000-0000-4000-a000-000000000018'),
  (1314, '2025-10-30T23:15:38.440Z', '00000000-0000-4000-a000-00000000005f', '00000000-0000-4000-a000-000000000025'),
  (1315, '2025-10-29T23:15:38.440Z', '00000000-0000-4000-a000-00000000005f', '00000000-0000-4000-a000-000000000032'),
  (1316, '2025-10-28T23:15:38.440Z', '00000000-0000-4000-a000-00000000005f', '00000000-0000-4000-a000-00000000003f'),
  (1317, '2025-10-27T23:15:38.440Z', '00000000-0000-4000-a000-00000000005f', '00000000-0000-4000-a000-00000000004c'),
  (1318, '2025-10-26T23:15:38.440Z', '00000000-0000-4000-a000-00000000005f', '00000000-0000-4000-a000-000000000059'),
  (1319, '2025-10-25T23:15:38.440Z', '00000000-0000-4000-a000-00000000005f', '00000000-0000-4000-a000-000000000002'),
  (1320, '2025-10-24T23:15:38.440Z', '00000000-0000-4000-a000-00000000005f', '00000000-0000-4000-a000-00000000000f'),
  (1321, '2025-10-23T23:15:38.440Z', '00000000-0000-4000-a000-00000000005f', '00000000-0000-4000-a000-00000000001c'),
  (1322, '2025-10-22T23:15:38.440Z', '00000000-0000-4000-a000-00000000005f', '00000000-0000-4000-a000-000000000029'),
  (1323, '2025-10-21T23:15:38.440Z', '00000000-0000-4000-a000-00000000005f', '00000000-0000-4000-a000-000000000036'),
  (1324, '2025-10-20T23:15:38.440Z', '00000000-0000-4000-a000-00000000005f', '00000000-0000-4000-a000-000000000043'),
  (1325, '2025-10-19T23:15:38.440Z', '00000000-0000-4000-a000-00000000005f', '00000000-0000-4000-a000-000000000050'),
  (1326, '2025-10-18T23:15:38.440Z', '00000000-0000-4000-a000-00000000005f', '00000000-0000-4000-a000-00000000005d'),
  (1327, '2025-10-17T23:15:38.440Z', '00000000-0000-4000-a000-000000000060', '00000000-0000-4000-a000-000000000042'),
  (1328, '2025-10-16T23:15:38.440Z', '00000000-0000-4000-a000-000000000060', '00000000-0000-4000-a000-00000000004f'),
  (1329, '2025-10-15T23:15:38.440Z', '00000000-0000-4000-a000-000000000060', '00000000-0000-4000-a000-00000000005c'),
  (1330, '2025-10-14T23:15:38.440Z', '00000000-0000-4000-a000-000000000060', '00000000-0000-4000-a000-000000000005'),
  (1331, '2025-10-13T23:15:38.440Z', '00000000-0000-4000-a000-000000000060', '00000000-0000-4000-a000-000000000012'),
  (1332, '2025-10-12T23:15:38.440Z', '00000000-0000-4000-a000-000000000060', '00000000-0000-4000-a000-00000000001f'),
  (1333, '2025-10-11T23:15:38.440Z', '00000000-0000-4000-a000-000000000060', '00000000-0000-4000-a000-00000000002c'),
  (1334, '2025-10-10T23:15:38.440Z', '00000000-0000-4000-a000-000000000060', '00000000-0000-4000-a000-000000000039'),
  (1335, '2025-10-09T23:15:38.440Z', '00000000-0000-4000-a000-000000000060', '00000000-0000-4000-a000-000000000046'),
  (1336, '2025-10-08T23:15:38.440Z', '00000000-0000-4000-a000-000000000060', '00000000-0000-4000-a000-000000000053'),
  (1337, '2025-10-07T23:15:38.440Z', '00000000-0000-4000-a000-000000000060', '00000000-0000-4000-a000-000000000009'),
  (1338, '2025-10-06T23:15:38.440Z', '00000000-0000-4000-a000-000000000060', '00000000-0000-4000-a000-000000000016'),
  (1339, '2025-10-05T23:15:38.440Z', '00000000-0000-4000-a000-000000000060', '00000000-0000-4000-a000-000000000023'),
  (1340, '2025-10-04T23:15:38.440Z', '00000000-0000-4000-a000-000000000060', '00000000-0000-4000-a000-000000000030'),
  (1341, '2025-10-03T23:15:38.440Z', '00000000-0000-4000-a000-000000000060', '00000000-0000-4000-a000-00000000003d'),
  (1342, '2025-10-02T23:15:38.440Z', '00000000-0000-4000-a000-000000000060', '00000000-0000-4000-a000-00000000004a'),
  (1343, '2025-10-01T23:15:38.440Z', '00000000-0000-4000-a000-000000000060', '00000000-0000-4000-a000-000000000057'),
  (1344, '2025-09-30T23:15:38.440Z', '00000000-0000-4000-a000-000000000060', '00000000-0000-4000-a000-000000000064'),
  (1345, '2025-09-29T23:15:38.440Z', '00000000-0000-4000-a000-000000000060', '00000000-0000-4000-a000-00000000000d'),
  (1346, '2025-09-28T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-000000000049'),
  (1347, '2025-09-27T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-000000000056'),
  (1348, '2025-09-26T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-000000000063'),
  (1349, '2025-09-25T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-00000000000c'),
  (1350, '2025-09-24T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-000000000019');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (1351, '2025-09-23T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-000000000026'),
  (1352, '2025-09-22T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-000000000033'),
  (1353, '2025-09-21T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-000000000040'),
  (1354, '2025-09-20T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-00000000004d'),
  (1355, '2025-09-19T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-00000000005a'),
  (1356, '2025-09-18T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-000000000003'),
  (1357, '2025-09-17T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-000000000010'),
  (1358, '2025-09-16T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-00000000001d'),
  (1359, '2025-09-15T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-00000000002a'),
  (1360, '2025-09-14T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-000000000037'),
  (1361, '2025-09-13T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-000000000044'),
  (1362, '2025-09-12T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-000000000051'),
  (1363, '2025-09-11T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-00000000005e'),
  (1364, '2025-09-10T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-000000000007'),
  (1365, '2025-09-09T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-000000000014'),
  (1366, '2025-09-08T23:15:38.440Z', '00000000-0000-4000-a000-000000000061', '00000000-0000-4000-a000-000000000021'),
  (1367, '2025-09-07T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-000000000050'),
  (1368, '2025-09-06T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-00000000005d'),
  (1369, '2025-09-05T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-000000000006'),
  (1370, '2025-09-04T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-000000000013'),
  (1371, '2025-09-03T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-000000000020'),
  (1372, '2025-09-02T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-00000000002d'),
  (1373, '2025-09-01T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-00000000003a'),
  (1374, '2025-08-31T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-000000000047'),
  (1375, '2025-08-30T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-000000000054'),
  (1376, '2025-08-29T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-000000000061'),
  (1377, '2025-08-28T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-00000000000a'),
  (1378, '2025-08-27T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-000000000017'),
  (1379, '2025-08-26T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-000000000024'),
  (1380, '2025-08-25T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-000000000031'),
  (1381, '2025-08-24T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-00000000003e'),
  (1382, '2025-08-23T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-00000000004b'),
  (1383, '2025-08-22T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-000000000058'),
  (1384, '2025-08-21T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-000000000001'),
  (1385, '2025-08-20T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-00000000000e'),
  (1386, '2025-08-19T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-00000000001b'),
  (1387, '2025-08-18T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-000000000028'),
  (1388, '2025-08-17T23:15:38.440Z', '00000000-0000-4000-a000-000000000062', '00000000-0000-4000-a000-000000000035'),
  (1389, '2025-08-16T23:15:38.440Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-000000000057'),
  (1390, '2025-08-15T23:15:38.440Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-000000000064'),
  (1391, '2025-08-14T23:15:38.440Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-00000000000d'),
  (1392, '2025-08-13T23:15:38.440Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-00000000001a'),
  (1393, '2025-08-12T23:15:38.440Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-000000000027'),
  (1394, '2025-08-11T23:15:38.440Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-000000000034'),
  (1395, '2025-08-10T23:15:38.440Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-000000000041'),
  (1396, '2025-08-09T23:15:38.440Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-00000000004e'),
  (1397, '2025-08-08T23:15:38.440Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-00000000005b'),
  (1398, '2025-08-07T23:15:38.440Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-000000000004'),
  (1399, '2025-08-06T23:15:38.440Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-000000000011'),
  (1400, '2025-08-05T23:15:38.440Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-00000000001e');

INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES
  (1401, '2025-08-04T23:15:38.440Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-00000000002b'),
  (1402, '2025-08-03T23:15:38.440Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-000000000038'),
  (1403, '2025-08-02T23:15:38.440Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-000000000045'),
  (1404, '2025-08-01T23:15:38.440Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-000000000052'),
  (1405, '2025-07-31T23:15:38.440Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-00000000005f'),
  (1406, '2025-07-30T23:15:38.440Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-000000000008'),
  (1407, '2025-07-29T23:15:38.440Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-000000000015'),
  (1408, '2025-07-28T23:15:38.441Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-000000000022'),
  (1409, '2025-07-27T23:15:38.441Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-00000000002f'),
  (1410, '2025-07-26T23:15:38.441Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-00000000003c'),
  (1411, '2025-07-25T23:15:38.441Z', '00000000-0000-4000-a000-000000000063', '00000000-0000-4000-a000-000000000049'),
  (1412, '2025-07-24T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-00000000005e'),
  (1413, '2025-07-23T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-000000000007'),
  (1414, '2025-07-22T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-000000000014'),
  (1415, '2025-07-21T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-000000000021'),
  (1416, '2025-07-20T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-00000000002e'),
  (1417, '2025-07-19T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-00000000003b'),
  (1418, '2025-07-18T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-000000000048'),
  (1419, '2025-07-17T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-000000000055'),
  (1420, '2025-07-16T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-000000000062'),
  (1421, '2025-07-15T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-00000000000b'),
  (1422, '2025-07-14T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-000000000018'),
  (1423, '2025-07-13T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-000000000025'),
  (1424, '2025-07-12T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-000000000032'),
  (1425, '2025-07-11T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-00000000003f'),
  (1426, '2025-07-10T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-00000000004c'),
  (1427, '2025-07-09T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-000000000059'),
  (1428, '2025-07-08T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-000000000002'),
  (1429, '2025-07-07T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-00000000000f'),
  (1430, '2025-07-06T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-00000000001c'),
  (1431, '2025-07-05T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-000000000029'),
  (1432, '2025-07-04T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-000000000036'),
  (1433, '2025-07-03T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-000000000043'),
  (1434, '2025-07-02T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-000000000050'),
  (1435, '2025-07-01T23:15:38.441Z', '00000000-0000-4000-a000-000000000064', '00000000-0000-4000-a000-00000000005d');

-- ============================================
-- RESUMO
-- 100 usuários inseridos
-- 299 posts inseridos
-- 200 comentários inseridos
-- 400 likes inseridos
-- 1435 seguidores inseridos
-- ============================================

-- ✅ Seed concluído!
-- 📊 ~730KB de dados (apenas texto + URLs externas, zero storage usado)
