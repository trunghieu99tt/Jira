import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableUserAlterUsernameAndEmailAndAvatarFileId1649087708276
  implements MigrationInterface
{
  name = 'AlterTableUserAlterUsernameAndEmailAndAvatarFileId1649087708276';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`)
        `);
    await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)
        `);
    await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`avatar_file_id\` \`avatar_file_id\` int NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`avatar_file_id\` \`avatar_file_id\` int NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`users\` DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\`
        `);
  }
}
